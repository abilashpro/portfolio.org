import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Atom, Braces, Download, Mail, MonitorSmartphone, Wind, Webhook } from 'lucide-react'
import { links, profile, stats } from '../data/portfolio'
import Blobs from './ui/Blobs'
import CountUp from './ui/CountUp'
import { Magnetic, Stars, Tilt, WordsReveal } from './ui/Motion'
import RotatingText from './ui/RotatingText'

const focusWords = ['Responsive UIs', 'React Applications', 'Reusable Components', 'Mobile-first Layouts', 'API-driven Features']

const badges = [
  // Positioned over the card edges / short code lines so no code is covered.
  { label: 'React.js', icon: Atom, className: '-top-5 left-4 sm:-left-8', delay: 0 },
  { label: 'JavaScript', icon: Braces, className: '-top-5 right-4 sm:top-[24%] sm:-right-12', delay: 1.2 },
  { label: 'Tailwind CSS', icon: Wind, className: 'top-[60%] -right-3 sm:-right-10', delay: 0.6 },
  { label: 'REST API', icon: Webhook, className: '-bottom-5 left-1/2 -translate-x-1/2', delay: 1.8 },
]

const codeLines = [
  [['text-fuchsia-400', 'const'], ['text-sky-300', ' developer'], ['text-slate-500', ' = {']],
  [['text-slate-400', '  name: '], ['text-emerald-300', `'${profile.name}'`], ['text-slate-500', ',']],
  [['text-slate-400', '  role: '], ['text-emerald-300', "'Frontend / React.js'"], ['text-slate-500', ',']],
  [['text-slate-400', '  stack: ['], ['text-emerald-300', "'React'"], ['text-slate-500', ', '], ['text-emerald-300', "'JS'"], ['text-slate-500', ', '], ['text-emerald-300', "'Tailwind'"], ['text-slate-400', '],']],
  [['text-slate-400', '  focus: '], ['text-emerald-300', "'responsive UI'"], ['text-slate-500', ',']],
  [['text-slate-400', '  mobileFirst: '], ['text-amber-300', 'true'], ['text-slate-500', ',']],
  [['text-slate-500', '}']],
]

function HeroVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      {/* Glow under the card */}
      <div aria-hidden="true" className="absolute inset-8 -z-10 rounded-full bg-gradient-to-tr from-emerald-500/40 via-cyan-500/25 to-transparent blur-3xl" />
      {/* Slowly rotating orbit behind the card */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin-slow size-full rounded-full border border-dashed border-white/10" />
        <span className="absolute top-[14%] left-[14%] size-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_4px_rgb(52_211_153/0.6)]" />
        <span className="absolute right-[10%] bottom-[22%] size-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgb(103_232_249/0.6)]" />
      </div>

      {/* Editor card */}
      <Tilt max={7} className="glow-border rounded-3xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/80 shadow-[0_40px_80px_-30px_rgb(0_0_0/1)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-xs text-slate-500">developer.js</span>
          </div>
          <pre className="overflow-x-auto px-4 py-6 font-mono text-[0.72rem] leading-7 sm:px-6 sm:text-[0.82rem]">
            <code>
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-5 w-4 shrink-0 text-right text-slate-700 select-none">{i + 1}</span>
                  <span className="whitespace-pre">
                    {line.map(([cls, text], j) => (
                      <span key={j} className={cls}>
                        {text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>

          {/* Responsive strip */}
          <div className="flex items-center gap-3 border-t border-white/[0.06] bg-emerald-400/[0.04] px-4 py-3 sm:px-6">
            <MonitorSmartphone size={18} className="shrink-0 text-emerald-300" aria-hidden="true" />
            <span className="text-xs text-slate-300 sm:text-sm">Responsive Design</span>
            <div className="ml-auto flex items-end gap-1.5" aria-hidden="true">
              <span className="h-4 w-6 rounded-sm border-2 border-emerald-400/80" />
              <span className="h-4 w-3.5 rounded-sm border-2 border-emerald-400/80" />
              <span className="h-4 w-2 rounded-[3px] border-2 border-emerald-400/80" />
            </div>
          </div>
        </div>
      </Tilt>

      {/* Floating badges */}
      {badges.map(({ label, icon: Icon, className, delay }) => (
        <motion.div
          key={label}
          className={`absolute z-10 ${className}`}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-800/80 py-1.5 pr-3.5 pl-1.5 text-xs font-medium text-white shadow-[0_10px_30px_-10px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:text-sm">
            <span className="grid size-6 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
              <Icon size={14} aria-hidden="true" />
            </span>
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // Scroll parallax: text and visual drift apart and fade as the hero leaves.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0])

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate overflow-x-clip pt-32 pb-24 sm:pt-40 lg:pt-44 lg:pb-32">
      {/* Background: grid, light beams, glows */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden">
        <span className="animate-beam absolute -top-40 left-[18%] h-[46rem] w-40 bg-gradient-to-b from-emerald-300/25 to-transparent blur-3xl [--r:18deg]" />
        <span className="animate-beam absolute -top-40 left-[46%] h-[46rem] w-28 bg-gradient-to-b from-cyan-300/20 to-transparent blur-3xl [--r:-8deg] [animation-delay:-2.5s]" />
        <span className="animate-beam absolute -top-40 right-[12%] h-[46rem] w-36 bg-gradient-to-b from-emerald-300/15 to-transparent blur-3xl [--r:-22deg] [animation-delay:-5s]" />
      </div>
      <Blobs variant="hero" />
      <Stars className="[mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-page grid items-center gap-20 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <motion.div style={{ y: textY, opacity: fadeOut }} className="min-w-0 max-w-2xl">
          <motion.p {...fade(0)} className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-4 pl-2 text-sm text-slate-300 backdrop-blur">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 font-mono text-[0.7rem] font-medium text-emerald-300 uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Open
            </span>
            Available for opportunities
          </motion.p>

          <h1
            id="hero-title"
            className="mt-8 text-5xl leading-[0.95] font-semibold tracking-[-0.045em] min-[400px]:text-6xl sm:text-7xl xl:text-8xl"
          >
            <WordsReveal text="Hi, I'm" wordClassName="text-metal" delay={0.1} className="block" />
            <WordsReveal text={profile.name} wordClassName="text-gradient animate-gradient" delay={0.28} className="block" />
          </h1>

          <motion.p {...fade(0.2)} className="mt-7 text-xl font-medium text-white sm:text-2xl">
            {profile.role}
          </motion.p>

          <motion.p {...fade(0.26)} className="mt-2 flex flex-wrap items-baseline gap-x-2 text-lg text-slate-500 sm:text-xl">
            I build
            <RotatingText words={focusWords} className="font-medium text-emerald-300" />
          </motion.p>

          <motion.p {...fade(0.32)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-10 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Magnetic>
              <a href="#projects" className="btn-primary group w-full">
                View My Work
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                <Download size={17} aria-hidden="true" />
                Download Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost w-full">
                <Mail size={17} aria-hidden="true" />
                Contact Me
              </a>
            </Magnetic>
          </motion.div>

          {/* Quick stats */}
          <motion.dl {...fade(0.48)} className="mt-14 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="bg-ink-950/90 px-4 py-4 sm:px-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  <CountUp value={stat.value} />
                </dd>
                <dd className="mt-1 text-xs leading-snug text-slate-500">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 px-4 sm:px-10 lg:px-0"
        >
          <motion.div style={{ y: visualY, opacity: fadeOut }}>
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
