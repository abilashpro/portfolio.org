import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Code, Gauge, PenTool, Search } from 'lucide-react'
import Blobs from './ui/Blobs'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const steps = [
  {
    no: '01',
    icon: Search,
    title: 'Understand',
    text: 'Understand project requirements, user flow, and functionality.',
  },
  {
    no: '02',
    icon: PenTool,
    title: 'Design',
    text: 'Create responsive and reusable UI structures.',
  },
  {
    no: '03',
    icon: Code,
    title: 'Develop',
    text: 'Build React components and integrate APIs.',
  },
  {
    no: '04',
    icon: Gauge,
    title: 'Test & Optimize',
    text: 'Test across desktop, tablet, and mobile devices and improve performance, responsiveness, and user experience.',
  },
]

export default function DevelopmentProcess() {
  const listRef = useRef(null)
  // Progress of the list through the viewport drives the connector "drawing".
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="process" aria-labelledby="process-title" className="section relative isolate overflow-x-clip">
      <Blobs />
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          title="How I Work"
          description="A simple, repeatable process that keeps projects clear from requirements to a polished, responsive release."
        />

        <ol ref={listRef} className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
          {/* Connector track + animated fill: vertical on mobile/tablet, horizontal on desktop */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-px bg-white/10 lg:hidden" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-6 w-px origin-top bg-gradient-to-b from-emerald-400 to-cyan-300 shadow-[0_0_10px_rgb(52_211_153)] lg:hidden"
          />
          <span aria-hidden="true" className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-white/10 lg:block" />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-[0_0_10px_rgb(52_211_153)] lg:block"
          />

          {steps.map(({ no, icon: Icon, title, text }, i) => (
            <Reveal as="li" key={no} delay={i * 0.1} className="group relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-ink-900 text-emerald-300 shadow-[0_0_30px_-4px_rgb(52_211_153/0.6)] transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-ink-950">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div className="card relative flex-1 overflow-hidden p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-400/25 lg:mt-6 lg:w-full lg:p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -bottom-8 text-8xl font-semibold tracking-tighter text-white/[0.03] transition-colors group-hover:text-emerald-400/[0.08]"
                >
                  {no}
                </span>
                <span className="relative font-mono text-xs text-emerald-400">{no}</span>
                <h3 className="relative mt-2 text-lg font-medium">{title}</h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-slate-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
