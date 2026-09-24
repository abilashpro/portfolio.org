import { WordsReveal } from './Motion'
import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'center', id }) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-12 max-w-3xl sm:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className={`flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-emerald-300 uppercase ${centered ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400" />
          {eyebrow}
          {centered && <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400" />}
        </span>
      )}
      <h2 id={id} className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
        <WordsReveal text={title} wordClassName="text-metal" delay={0.1} />
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>}
    </Reveal>
  )
}
