import { Atom, Bell, Braces, CalendarDays, FileCode2, GitBranch, GripVertical, Layers, MessageSquareText, Palette, PenLine, Server, Webhook, Wind } from 'lucide-react'

const items = [
  { name: 'React.js', icon: Atom },
  { name: 'JavaScript', icon: Braces },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'MUI', icon: Layers },
  { name: 'HTML5', icon: FileCode2 },
  { name: 'CSS3', icon: Palette },
  { name: 'REST APIs', icon: Webhook },
  { name: 'Laravel', icon: Server },
  { name: 'Git', icon: GitBranch },
  { name: 'Summernote', icon: PenLine },
  { name: 'Tippy.js', icon: MessageSquareText },
  { name: 'Day.js', icon: CalendarDays },
  { name: 'SortableJS', icon: GripVertical },
  { name: 'React Toastify', icon: Bell },
]

/** Infinite horizontal strip of technologies. Pauses on hover. */
export default function TechMarquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const loop = [...items, ...items]

  return (
    <div className="relative border-y border-white/[0.06] bg-white/[0.015] py-6">
      <p className="sr-only">Technologies: {items.map((i) => i.name).join(', ')}</p>
      <div className="mask-fade-x group space-y-5 overflow-hidden" aria-hidden="true">
        {[
          { list: loop, anim: 'animate-marquee' },
          { list: [...loop].reverse(), anim: 'animate-marquee-reverse' },
        ].map(({ list, anim }) => (
          <ul key={anim} className={`${anim} flex w-max gap-10 group-hover:[animation-play-state:paused] sm:gap-14`}>
            {list.map(({ name, icon: Icon }, i) => (
              <li
                key={`${name}-${i}`}
                className="flex items-center gap-2.5 text-base font-medium whitespace-nowrap text-slate-500 transition-colors hover:text-white"
              >
                <Icon size={18} className="text-emerald-400/80" />
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
