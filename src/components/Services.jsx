import { motion } from 'framer-motion'
import { Code2, LayoutDashboard, MonitorSmartphone, Plug } from 'lucide-react'
import { ApiArt, CodeArt, ComponentsArt, DevicesArt } from './ui/Illustrations'
import Reveal from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'
import SectionHeading from './ui/SectionHeading'

const services = [
  {
    icon: Code2,
    art: CodeArt,
    title: 'Frontend Development',
    text: 'Building modern and responsive React.js applications.',
  },
  {
    icon: MonitorSmartphone,
    art: DevicesArt,
    title: 'Responsive Web Design',
    text: 'Creating layouts that work smoothly across desktop, tablet, and mobile devices.',
  },
  {
    icon: LayoutDashboard,
    art: ComponentsArt,
    title: 'UI Development',
    text: 'Building clean and modern interfaces using Tailwind CSS and MUI.',
  },
  {
    icon: Plug,
    art: ApiArt,
    title: 'API Integration',
    text: 'Integrating REST APIs and handling loading states, errors, validation, and dynamic data.',
  },
]

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section relative isolate overflow-x-clip">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="What I Can Help With"
          description="Focused frontend services for teams that need reliable, responsive and maintainable interfaces."
        />

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {services.map(({ icon: Icon, art: Art, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.06} className="h-full">
              <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="group h-full">
                <SpotlightCard className="card h-full p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-emerald-300 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="relative mb-6 aspect-[5/3] overflow-hidden rounded-2xl border border-white/[0.06] transition-transform duration-500 group-hover:scale-[1.03]">
                  <Art />
                </div>
                <span className="grid size-11 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-colors group-hover:bg-emerald-400 group-hover:text-ink-950">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-400">{text}</p>
                </SpotlightCard>
              </motion.div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
