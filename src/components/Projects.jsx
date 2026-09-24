import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, MonitorSmartphone, Smartphone } from 'lucide-react'
import { projects } from '../data/portfolio'
import { GithubIcon } from './ui/BrandIcons'
import { DesktopFrame, PhoneFrame, TabletFrame, Wireframe } from './ui/DeviceMockups'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import { Tilt } from './ui/Motion'

/* ----------------------------- Previews ----------------------------- */

function PromoPreview({ project }) {
  const { screenshots: s, name } = project
  return (
    <div className="relative pr-[14%] pb-[10%]">
      <DesktopFrame src={s.desktop} alt={`${name} desktop view`}>
        <Wireframe project="promo" device="desktop" />
      </DesktopFrame>
      <TabletFrame src={s.tablet} alt={`${name} tablet view`} className="absolute right-[4%] bottom-0 w-[30%]">
        <Wireframe project="promo" device="tablet" />
      </TabletFrame>
      <PhoneFrame src={s.mobile} alt={`${name} mobile view`} className="absolute right-[-2%] bottom-[-4%] w-[17%] !p-1">
        <Wireframe project="promo" device="mobile" />
      </PhoneFrame>
    </div>
  )
}

function DorsinPreview({ project }) {
  const { screenshots: s, name } = project
  return (
    <div className="relative pb-[6%] pl-[4%]">
      <DesktopFrame src={s.desktop} alt={`${name} desktop view`} className="w-[76%]">
        <Wireframe project="dorsin" device="desktop" />
      </DesktopFrame>
      {/* Mobile is intentionally the hero of this preview */}
      <PhoneFrame src={s.mobile} alt={`${name} mobile view`} className="absolute right-[18%] bottom-0 w-[24%]">
        <Wireframe project="dorsin" device="mobile" />
      </PhoneFrame>
      <PhoneFrame src={s.mobile} alt="" className="absolute right-0 bottom-[8%] w-[20%] opacity-90">
        <Wireframe project="dorsin" device="mobile" />
      </PhoneFrame>
    </div>
  )
}

/* ------------------------------ Card ------------------------------- */

function ProjectLink({ href, children, variant }) {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  if (!href) {
    return (
      <button type="button" disabled title="Link coming soon" className={`${cls} cursor-not-allowed opacity-60 hover:translate-y-0`}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  )
}

const badgeIcon = { promo: MonitorSmartphone, dorsin: Smartphone }

function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1
  const BadgeIcon = badgeIcon[project.id]
  const hasScreens = project.screenshots && Object.values(project.screenshots).some(Boolean)

  const preview = project.id === 'promo' ? <PromoPreview project={project} /> : <DorsinPreview project={project} />

  // Preview drifts against the scroll for a subtle depth effect.
  const previewRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: previewRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50])

  return (
    <Reveal as="article" aria-labelledby={`project-${project.id}`}>
      <SpotlightCard className="group card grid rounded-[2rem] lg:grid-cols-2">
        {/* Preview */}
        <div
          ref={previewRef}
          className={`relative flex items-center overflow-hidden px-6 pt-14 pb-10 sm:px-12 sm:pt-16 sm:pb-12 ${
            reversed ? 'lg:order-2' : ''
          }`}
        >
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-emerald-500/30 via-cyan-500/15 to-transparent opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          />
          <motion.div style={{ y }} className="relative w-full">
            <Tilt max={6}>
              {preview}
            </Tilt>
          </motion.div>
          {project.screenshots && !hasScreens && (
            <span className="absolute top-4 left-4 rounded-full border border-white/10 bg-ink-900/80 px-2.5 py-1 font-mono text-[0.65rem] text-slate-400 backdrop-blur">
              Layout preview · screenshots coming soon
            </span>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col border-white/[0.06] p-6 sm:p-10 lg:p-12 ${reversed ? 'lg:border-r' : 'lg:border-l'} border-t lg:border-t-0`}>
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <BadgeIcon size={14} aria-hidden="true" />
              {project.badge}
            </span>
            <span aria-hidden="true" className="font-mono text-sm text-slate-600">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 id={`project-${project.id}`} className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            {project.name}
          </h3>
          <p className="mt-4 leading-relaxed text-slate-400">{project.description}</p>

          <h4 className="mt-8 font-mono text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">Key highlights</h4>
          <ul className="mt-4 grid gap-x-4 gap-y-2.5 min-[420px]:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 pt-2 min-[420px]:flex-row lg:mt-auto">
            <ProjectLink href={project.liveUrl} variant="primary">
              View Project
              <ArrowUpRight size={16} aria-hidden="true" />
            </ProjectLink>
            <ProjectLink href={project.githubUrl}>
              <GithubIcon size={16} />
              GitHub
            </ProjectLink>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section relative isolate overflow-x-clip">
      <div aria-hidden="true" className="absolute top-40 left-1/2 -z-10 h-[40rem] w-[70rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/[0.05] blur-[140px]" />
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Selected work"
          description="Selected work focused on responsive layouts and mobile-first UI."
        />
        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
