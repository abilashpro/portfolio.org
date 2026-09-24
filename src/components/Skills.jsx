import {
  Atom,
  Bell,
  Braces,
  CalendarDays,
  CodeXml,
  FileCode2,
  GitBranch,
  GripVertical,
  Layers,
  MessageSquareText,
  Palette,
  PenLine,
  Server,
  Webhook,
  Wind,
} from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GithubIcon } from './ui/BrandIcons'
import Blobs from './ui/Blobs'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'

const skillGroups = [
  {
    title: 'Frontend',
    tint: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
    skills: [
      { name: 'React.js', icon: Atom, text: 'Component-based UIs, hooks and state management.' },
      { name: 'JavaScript', icon: Braces, text: 'Modern ES6+ for interactive, dynamic features.' },
      { name: 'HTML5', icon: FileCode2, text: 'Semantic, accessible page structure.' },
      { name: 'CSS3', icon: Palette, text: 'Flexbox, Grid and responsive media queries.' },
      { name: 'Tailwind CSS', icon: Wind, text: 'Utility-first, mobile-first responsive styling.' },
      { name: 'MUI', icon: Layers, text: 'Material UI components, theming and layouts.' },
    ],
  },
  {
    title: 'API / Backend Integration',
    tint: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
    skills: [
      { name: 'Laravel', icon: Server, text: 'Consuming Laravel-backed endpoints from the frontend.' },
      { name: 'REST APIs', icon: Webhook, text: 'Fetching data with loading, error and validation states.' },
    ],
  },
  {
    title: 'Tools',
    tint: 'text-slate-200 bg-white/[0.06] border-white/10',
    skills: [
      { name: 'Git', icon: GitBranch, text: 'Branching, commits and version control workflows.' },
      { name: 'GitHub', icon: GithubIcon, text: 'Repositories, pull requests and collaboration.' },
      { name: 'VS Code', icon: CodeXml, text: 'Daily editor with a productive extension setup.' },
    ],
  },
  {
    title: 'Libraries',
    tint: 'text-teal-300 bg-teal-400/10 border-teal-400/20',
    skills: [
      { name: 'Tippy.js', icon: MessageSquareText, text: 'Tooltips, popovers and contextual UI.' },
      { name: 'Day.js', icon: CalendarDays, text: 'Lightweight date parsing and formatting.' },
      { name: 'SortableJS', icon: GripVertical, text: 'Drag-and-drop reordering interactions.' },
      { name: 'React Toastify', icon: Bell, text: 'Non-blocking user notifications.' },
      { name: 'Summernote', icon: PenLine, text: 'Rich text editing, customized toolbars.' },
    ],
  },
]

const allSkills = skillGroups.flatMap((g) => g.skills.map((skill) => ({ ...skill, group: g.title, tint: g.tint })))
const filters = ['All', ...skillGroups.map((g) => g.title)]

function SkillCard({ name, icon: Icon, text, group, tint, index }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <SpotlightCard className="card flex h-full gap-4 p-5 transition-transform duration-300 hover:-translate-y-1 sm:flex-col sm:p-6">
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl border transition-transform duration-500 group-hover/spot:scale-110 group-hover/spot:-rotate-6 ${tint}`}>
          <Icon size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-medium">{name}</h3>
          <p className="mt-1 font-mono text-[0.65rem] tracking-[0.14em] text-slate-500 uppercase">{group}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
        </div>
      </SpotlightCard>
    </motion.li>
  )
}

export default function Skills() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? allSkills : allSkills.filter((s) => s.group === filter)

  return (
    <section id="skills" aria-labelledby="skills-title" className="section relative isolate overflow-x-clip">
      <Blobs />
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />

      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="Technologies I Work With"
          description="A focused frontend toolkit for building responsive, reusable and API-driven interfaces."
        />

        <Reveal className="mb-8 flex justify-center sm:mb-10">
          <div
            role="group"
            aria-label="Filter skills by category"
            className="mask-fade-x -mx-4 flex max-w-[calc(100%+2rem)] gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:max-w-full sm:[mask-image:none] sm:rounded-full sm:border sm:border-white/10 sm:bg-white/[0.03] sm:p-1.5 sm:backdrop-blur"
          >
            {filters.map((f) => {
              const active = filter === f
              const count = f === 'All' ? allSkills.length : allSkills.filter((s) => s.group === f).length
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`relative isolate flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    active ? 'text-ink-950' : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white sm:border-0 sm:bg-transparent'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="skill-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_24px_-4px_rgb(52_211_153/0.7)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f}
                  <span className={`rounded-full px-1.5 font-mono text-[0.7rem] ${active ? 'bg-ink-950/15' : 'bg-white/[0.06] text-slate-500'}`}>{count}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <motion.ul layout className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((skill, i) => (
              <SkillCard key={skill.name} {...skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
