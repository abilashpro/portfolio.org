import { ArrowUpRight, Download } from 'lucide-react'
import { links } from '../data/portfolio'
import { Magnetic, Stars, WordsReveal } from './ui/Motion'
import Reveal from './ui/Reveal'

export default function ResumeCTA() {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="glow-border rounded-[2.5rem]">
          <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-900 px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-28">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]" />
            {/* Horizon glow */}
            <div aria-hidden="true" className="absolute -bottom-48 left-1/2 -z-10 h-96 w-[120%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-emerald-500/70 via-cyan-500/30 to-transparent blur-3xl" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
            <div aria-hidden="true" className="animate-blob absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-cyan-500/15 blur-3xl" />
            <Stars />

            <p className="font-mono text-xs tracking-[0.2em] text-emerald-300 uppercase">Next step</p>
            <h2 id="cta-title" className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:text-7xl">
              <WordsReveal text="Let's build something great together" wordClassName="text-metal" delay={0.15} />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-slate-400 sm:text-lg">
              Interested in working together or learning more about my experience?
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 min-[420px]:flex-row">
              <Magnetic>
                <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                  <Download size={17} aria-hidden="true" />
                  Download Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn-secondary group w-full">
                  Contact Me
                  <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
