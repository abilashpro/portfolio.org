import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Monitor, Smartphone, Tablet } from 'lucide-react'
import { projects } from '../data/portfolio'
import { DesktopFrame, PhoneFrame, TabletFrame, Wireframe } from './ui/DeviceMockups'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const showcaseProjects = projects.filter((p) => p.id === 'promo' || p.id === 'dorsin')

const devices = [
  { key: 'desktop', label: 'Desktop View', icon: Monitor, note: 'Wide multi-column layout' },
  { key: 'tablet', label: 'Tablet View', icon: Tablet, note: 'Grids reflow to two columns' },
  { key: 'mobile', label: 'Mobile View', icon: Smartphone, note: 'Single column, touch-friendly' },
]

const principles = ['Mobile-first CSS', 'Fluid grids & flexbox', 'Responsive typography', 'Touch-friendly navigation']

function DeviceCard({ device, project, index }) {
  const { key, label, icon: Icon, note } = device
  const src = project.screenshots?.[key]
  const alt = `${project.name} ${label.toLowerCase()}`
  const isMobile = key === 'mobile'

  const frame =
    key === 'desktop' ? (
      <DesktopFrame src={src} alt={alt} className="w-full">
        <Wireframe project={project.id} device="desktop" />
      </DesktopFrame>
    ) : key === 'tablet' ? (
      <TabletFrame src={src} alt={alt} className="mx-auto w-[82%] max-w-60">
        <Wireframe project={project.id} device="tablet" />
      </TabletFrame>
    ) : (
      <PhoneFrame src={src} alt={alt} className="mx-auto w-[72%] max-w-48">
        <Wireframe project={project.id} device="mobile" />
      </PhoneFrame>
    )

  return (
    <motion.figure
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col rounded-3xl border p-4 sm:p-6 ${
        isMobile
          ? 'border-emerald-400/30 bg-gradient-to-b from-emerald-400/[0.08] to-white/[0.01] shadow-[0_0_60px_-20px_rgb(16_185_129/0.6)]'
          : 'border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01]'
      } ${key === 'desktop' ? 'col-span-2 lg:col-span-1' : ''}`}
    >
      <div className="flex flex-1 items-end justify-center pb-5">
        <div className="w-full">{frame}</div>
      </div>
      <figcaption className="flex items-start gap-3 border-t border-white/[0.06] pt-4">
        <span
          className={`${key === 'desktop' ? 'grid' : 'hidden sm:grid'} size-9 shrink-0 place-items-center rounded-lg ${
            isMobile ? 'bg-gradient-to-br from-emerald-400 to-cyan-400 text-ink-950' : 'border border-white/10 bg-white/[0.04] text-emerald-300'
          }`}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-white sm:text-base">{label}</span>
          <span className="block text-xs text-slate-400 sm:text-sm">{note}</span>
        </span>
        {isMobile && (
          <span className="ml-auto hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-300 xl:inline">
            Focus
          </span>
        )}
      </figcaption>
    </motion.figure>
  )
}

export default function ResponsiveShowcase() {
  const [activeId, setActiveId] = useState(showcaseProjects[0].id)
  const project = showcaseProjects.find((p) => p.id === activeId)

  return (
    <section id="responsive" aria-labelledby="responsive-title" className="section relative isolate overflow-x-clip">
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 -z-10 h-[28rem] w-[56rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-[120px]" />

      <div className="container-page">
        <SectionHeading
          id="responsive-title"
          eyebrow="Responsive by default"
          title="Responsive Web Development"
          description="I focus on creating interfaces that provide a consistent and user-friendly experience across desktop, tablet, and mobile devices."
        />

        {/* Flow + project switcher */}
        <Reveal className="mb-8 flex flex-col items-center gap-5 sm:mb-10">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-300" aria-label="Breakpoint flow">
            {devices.map((d, i) => (
              <li key={d.key} className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${
                    d.key === 'mobile' ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200' : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <d.icon size={15} aria-hidden="true" />
                  {d.label.replace(' View', '')}
                </span>
                {i < devices.length - 1 && <ArrowRight size={16} className="text-slate-600" aria-hidden="true" />}
              </li>
            ))}
          </ol>

          <div role="tablist" aria-label="Choose example project" className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            {showcaseProjects.map((p) => {
              const selected = p.id === activeId
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls="responsive-panel"
                  onClick={() => setActiveId(p.id)}
                  className={`relative isolate min-h-10 rounded-full px-5 text-sm font-medium transition-colors ${
                    selected ? 'text-ink-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="showcase-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {p.name}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div id="responsive-panel" role="tabpanel" aria-labelledby={`tab-${activeId}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 items-stretch gap-4 sm:gap-6 lg:grid-cols-[2fr_1.1fr_1fr]"
            >
              {devices.map((device, i) => (
                <DeviceCard key={device.key} device={device} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {principles.map((p) => (
              <li key={p} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-xs text-slate-400">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
