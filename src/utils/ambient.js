/**
 * Generative ambient soundtrack built with the Web Audio API — no audio files.
 * Slow, overlapping pad chords through a drifting low-pass filter, a soft bass
 * note, sparse pentatonic bells and a synthetic reverb.
 */

// Am7 → Fmaj7 → Cmaj7 → G6 (MIDI note numbers)
const CHORDS = [
  [57, 60, 64, 67],
  [53, 57, 60, 64],
  [48, 55, 59, 64],
  [55, 59, 62, 64],
]
// A minor pentatonic, upper register, for the bells
const BELLS = [69, 72, 74, 76, 79, 81, 84]
const BAR = 8 // seconds per chord

const freq = (note) => 440 * 2 ** ((note - 69) / 12)

// Decaying stereo noise = a cheap, smooth reverb tail.
function impulse(ctx, seconds, decay) {
  const length = ctx.sampleRate * seconds
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch)
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay
  }
  return buffer
}

export function createAmbient({ volume = 0.8 } = {}) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()

  const master = ctx.createGain()
  master.gain.value = 0
  const limiter = ctx.createDynamicsCompressor()
  master.connect(limiter).connect(ctx.destination)

  // Dry + reverb sends
  const bus = ctx.createGain()
  const dry = ctx.createGain()
  dry.gain.value = 0.55
  const reverb = ctx.createConvolver()
  reverb.buffer = impulse(ctx, 5, 2.4)
  const wet = ctx.createGain()
  wet.gain.value = 0.6
  bus.connect(dry).connect(master)
  bus.connect(reverb).connect(wet).connect(master)

  // Pads go through a low-pass whose cutoff slowly breathes.
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1100
  filter.Q.value = 0.7
  filter.connect(bus)
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.04
  const lfoDepth = ctx.createGain()
  lfoDepth.gain.value = 500
  lfo.connect(lfoDepth).connect(filter.frequency)
  lfo.start()

  function voice({ type, hz, detune = 0, start, attack, hold, release, level, dest }) {
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.value = hz
    osc.detune.value = detune
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, start)
    g.gain.linearRampToValueAtTime(level, start + attack)
    g.gain.setValueAtTime(level, start + attack + hold)
    g.gain.linearRampToValueAtTime(0, start + attack + hold + release)
    osc.connect(g).connect(dest)
    osc.start(start)
    osc.stop(start + attack + hold + release + 0.1)
  }

  function playBar(chord, t) {
    // Two slightly detuned voices per note for width; long release crossfades into the next bar.
    for (const note of chord) {
      for (const detune of [-7, 7]) {
        voice({ type: 'triangle', hz: freq(note), detune, start: t, attack: 3, hold: BAR - 3, release: 4, level: 0.035, dest: filter })
      }
    }
    voice({ type: 'sine', hz: freq(chord[0] - 12), start: t, attack: 2, hold: BAR - 2, release: 3, level: 0.07, dest: filter })

    // A few gentle bells scattered through the bar
    for (let beat = 0; beat < 4; beat++) {
      if (Math.random() < 0.55) {
        const note = BELLS[Math.floor(Math.random() * BELLS.length)]
        const start = t + beat * (BAR / 4) + Math.random() * 0.6
        voice({ type: 'sine', hz: freq(note), start, attack: 0.02, hold: 0, release: 3.5, level: 0.03, dest: bus })
      }
    }
  }

  let step = 0
  let next = 0
  let timer = null
  let suspendTimer = null

  // Look-ahead scheduler: keep ~1s of music queued.
  function schedule() {
    while (next < ctx.currentTime + 1) {
      playBar(CHORDS[step % CHORDS.length], next)
      next += BAR
      step++
    }
  }

  return {
    async start() {
      clearTimeout(suspendTimer)
      await ctx.resume()
      if (!timer) {
        if (next < ctx.currentTime) next = ctx.currentTime + 0.1
        schedule()
        timer = setInterval(schedule, 400)
      }
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
      master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 2.5)
    },
    stop() {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2)
      // Suspend after the fade so nothing keeps running in the background.
      suspendTimer = setTimeout(() => {
        clearInterval(timer)
        timer = null
        ctx.suspend()
      }, 1300)
    },
  }
}
