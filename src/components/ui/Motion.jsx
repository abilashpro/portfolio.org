import { Fragment, useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const spring = { stiffness: 180, damping: 18, mass: 0.4 }

/** Soft emerald glow that trails the pointer across the whole page (mouse only). */
export function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(-600), { stiffness: 120, damping: 24 })
  const y = useSpring(useMotionValue(-600), { stiffness: 120, damping: 24 })

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])

  if (reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 -z-10 hidden size-[600px] rounded-full bg-[radial-gradient(circle,rgb(16_185_129/0.10),transparent_65%)] [@media(pointer:fine)]:block"
    />
  )
}

/** Pulls its child slightly toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  )
}

/** 3D tilt that follows the pointer. */
export function Tilt({ children, max = 8, className = '', style }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }
  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Reveals text word by word, each word sliding up out of a mask.
 * `wordClassName` is applied per word so gradient text still renders.
 */
export function WordsReveal({ text, className = '', wordClassName = '', delay = 0, stagger = 0.06 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={`inline-block ${wordClassName}`}
                initial={reduce ? false : { y: '110%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>{' '}
          </Fragment>
        ))}
      </span>
    </span>
  )
}

// Deterministic pseudo-random positions so the layout is stable between renders.
const stars = Array.from({ length: 34 }, (_, i) => {
  const r = (n) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2) % 1
  return {
    top: `${(r(1) * 100).toFixed(2)}%`,
    left: `${(r(2) * 100).toFixed(2)}%`,
    size: r(3) > 0.8 ? 3 : r(3) > 0.4 ? 2 : 1,
    delay: `${(-r(4) * 5).toFixed(2)}s`,
    duration: `${(3 + r(5) * 4).toFixed(2)}s`,
  }
})

/** Small twinkling points of light for dark backgrounds. */
export function Stars({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.duration }}
        />
      ))}
    </div>
  )
}
