import { Check, Code2, Component, Plug, Smartphone, Sparkles } from 'lucide-react'
import { aboutHighlights, profile, stats } from '../data/portfolio'
import CountUp from './ui/CountUp'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'

const pillars = [
  { icon: Code2, title: 'React & JavaScript', text: 'Component-driven apps with clean, maintainable logic.' },
  { icon: Smartphone, title: 'Mobile-first UI', text: 'Layouts designed for small screens, scaled up with intent.' },
  { icon: Component, title: 'Reusable components', text: 'Forms, modals, tabs, dropdowns and loaders built to reuse.' },
  { icon: Plug, title: 'API-driven', text: 'REST integrations with loading, error and validation states.' },
]

function ProfileCard() {
  return (
    <SpotlightCard className="card flex h-full flex-col items-center justify-center p-8 text-center">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 h-40 w-64 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="glow-border rounded-full p-1">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            decoding="async"
            className="size-40 rounded-full bg-ink-900 object-cover sm:size-48"
          />
        ) : (
          <span className="grid size-40 place-items-center rounded-full bg-gradient-to-br from-ink-700 to-ink-900 text-5xl font-semibold tracking-tight">
            <span className="text-gradient">{profile.name[0]}</span>
          </span>
        )}
      </div>
      <p className="mt-6 text-xl font-semibold tracking-tight text-white">{profile.name}</p>
      <p className="mt-1 text-sm text-slate-400">{profile.role}</p>
      <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1 text-xs text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153)]" />
        Available for work
      </p>
    </SpotlightCard>
  )
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section relative isolate overflow-x-clip">
      <div aria-hidden="true" className="absolute top-1/4 right-[-10rem] -z-10 size-[30rem] rounded-full bg-emerald-500/[0.06] blur-[120px]" />

      <div className="container-page">
        <SectionHeading id="about-title" eyebrow="About" title="Crafting interfaces that feel effortless" align="left" />

        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* Intro */}
          <Reveal className="sm:col-span-2 lg:col-span-4 lg:row-span-2">
            <SpotlightCard className="card h-full p-6 sm:p-10">
              <Sparkles size={22} className="text-emerald-300" aria-hidden="true" />
              <p className="mt-6 text-xl leading-relaxed text-slate-300 sm:text-2xl sm:leading-relaxed">
                I am a <span className="font-medium text-white">Frontend / React.js Developer</span> focused on building responsive, reusable,
                and user-friendly web applications. I work with React.js, JavaScript, Tailwind CSS, MUI, REST APIs, and modern frontend
                libraries to create clean and maintainable interfaces.
              </p>
              <p className="mt-6 leading-relaxed text-slate-400">{profile.focus}</p>

              <h3 className="mt-10 font-mono text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">What I work on</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {aboutHighlights.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-white"
                  >
                    <Check size={13} className="text-emerald-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          {/* Profile */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <ProfileCard />
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.14} className="lg:col-span-2">
            <div className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07]">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-ink-900 p-5">
                  <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-slate-400">{stat.label}</p>
                  {stat.note && <p className="mt-0.5 font-mono text-[0.65rem] text-slate-600">{stat.note}</p>}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Pillars */}
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={0.06 * i} className="lg:col-span-3">
              <SpotlightCard className="card flex h-full items-start gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-medium">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{text}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
