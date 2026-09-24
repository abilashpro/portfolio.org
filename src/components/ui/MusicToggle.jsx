import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music2 } from 'lucide-react'
import { backgroundMusic } from '../../data/portfolio'
import { createAmbient } from '../../utils/ambient'

/** Plays an audio file on loop with a short fade in/out (same interface as createAmbient). */
function createFilePlayer(src, volume = 0.45) {
  const audio = new Audio(src)
  audio.loop = true
  audio.volume = 0
  let fade = null
  const fadeTo = (target, done) => {
    clearInterval(fade)
    fade = setInterval(() => {
      const next = audio.volume + Math.sign(target - audio.volume) * 0.03
      if (Math.abs(target - audio.volume) <= 0.03) {
        audio.volume = target
        clearInterval(fade)
        done?.()
      } else audio.volume = Math.min(1, Math.max(0, next))
    }, 50)
  }
  return {
    async start() {
      await audio.play()
      fadeTo(volume)
    },
    stop() {
      fadeTo(0, () => audio.pause())
    },
  }
}

/**
 * Floating sound toggle. Music never autoplays (browsers block it anyway) —
 * it starts on the visitor's click and fades in.
 */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [hint, setHint] = useState(false)
  const player = useRef(null)

  // A small "Play music" hint slides out a few seconds after load, then hides.
  useEffect(() => {
    const show = setTimeout(() => setHint(true), 3500)
    const hide = setTimeout(() => setHint(false), 9500)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  // Pause when the tab is hidden, resume when it comes back.
  useEffect(() => {
    if (!playing) return
    const onVisibility = () => (document.hidden ? player.current?.stop() : player.current?.start())
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [playing])

  const toggle = async () => {
    setHint(false)
    if (!player.current) player.current = backgroundMusic ? createFilePlayer(backgroundMusic) : createAmbient()
    if (playing) {
      player.current.stop()
      setPlaying(false)
    } else {
      try {
        await player.current.start()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-3 sm:bottom-6 sm:left-6">
      <motion.button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        title={playing ? 'Pause music' : 'Play music'}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`relative grid size-12 place-items-center rounded-full border backdrop-blur-xl transition-colors ${
          playing
            ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-300 shadow-[0_0_30px_-4px_rgb(52_211_153/0.7)]'
            : 'border-white/10 bg-ink-800/80 text-slate-300 shadow-lg hover:border-emerald-400/40 hover:text-emerald-300'
        }`}
      >
        {playing && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-emerald-400/40 [animation-duration:2.4s]" />}
        {playing ? (
          // Equalizer bars
          <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
            {[0, 0.2, 0.4, 0.1].map((delay, i) => (
              <span key={i} className="animate-eq w-[3px] origin-bottom rounded-full bg-current" style={{ height: '100%', animationDelay: `${delay}s` }} />
            ))}
          </span>
        ) : (
          <Music2 size={19} aria-hidden="true" />
        )}
      </motion.button>

      <AnimatePresence>
        {hint && !playing && (
          <motion.button
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="hidden rounded-full border border-white/10 bg-ink-800/80 px-3.5 py-1.5 text-xs text-slate-300 shadow-lg backdrop-blur-xl sm:block"
          >
            ♪ Play some ambient music?
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
