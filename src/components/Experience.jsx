import { Briefcase, CalendarDays, CheckCircle2, MapPin } from 'lucide-react'
import { experience } from '../data/portfolio'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Experience() {
  const { position, company, period, location, groups, stack } = experience

  return (
    <section id="experience" aria-labelledby="experience-title" className="section relative isolate overflow-x-clip">
      <div aria-hidden="true" className="absolute top-1/3 left-[-12rem] -z-10 size-[32rem] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Professional Experience"
          description="Hands-on frontend work across responsive layouts, reusable components, API integration and editor customization."
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Timeline rail */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-5 hidden w-px bg-gradient-to-b from-emerald-400 via-emerald-400/20 to-transparent sm:block" />

          <Reveal as="article" className="relative sm:pl-16">
            <span
              aria-hidden="true"
              className="absolute top-6 left-0 hidden size-10 place-items-center rounded-full border border-emerald-400/40 bg-ink-900 text-emerald-300 shadow-[0_0_24px_-2px_rgb(52_211_153/0.6)] sm:grid"
            >
              <Briefcase size={16} />
            </span>

            <div className="card overflow-hidden rounded-3xl">
              {/* Header */}
              <header className="relative border-b border-white/[0.06] bg-gradient-to-r from-emerald-400/[0.08] via-transparent to-transparent p-6 sm:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold sm:text-3xl">{position}</h3>
                    <p className="mt-1.5 text-emerald-300">{company}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="chip gap-1.5">
                      <CalendarDays size={14} aria-hidden="true" />
                      {period}
                    </span>
                    <span className="chip gap-1.5">
                      <MapPin size={14} aria-hidden="true" />
                      {location}
                    </span>
                  </div>
                </div>
              </header>

              {/* Responsibilities */}
              <div className="grid gap-x-12 gap-y-8 p-6 sm:p-8 md:grid-cols-2">
                {groups.map((group) => (
                  <div key={group.title}>
                    <h4 className="font-mono text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">{group.title}</h4>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-slate-300">
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <footer className="border-t border-white/[0.06] bg-white/[0.015] p-6 sm:px-8">
                <p className="sr-only">Technologies used</p>
                <ul className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </footer>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
