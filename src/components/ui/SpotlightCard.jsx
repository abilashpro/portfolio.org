import { useRef } from 'react'

/**
 * Card with an emerald glow — on the surface and along the border — that
 * follows the pointer. Uses CSS variables updated on mousemove, no re-renders.
 */
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <Tag ref={ref} onMouseMove={onMove} className={`group/spot relative isolate overflow-hidden ${className}`} {...rest}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: 'radial-gradient(24rem circle at var(--x, 50%) var(--y, 50%), rgb(16 185 129 / 0.12), transparent 60%)' }}
      />
      {/* Border highlight: same gradient, masked to a 1px ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: 'radial-gradient(18rem circle at var(--x, 50%) var(--y, 50%), rgb(52 211 153 / 0.7), transparent 60%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </Tag>
  )
}
