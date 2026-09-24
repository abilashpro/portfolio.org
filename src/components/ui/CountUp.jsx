import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * Animates the numeric part of a value like "2.5+" or "16" when scrolled
 * into view. Non-numeric values are rendered as-is.
 */
export default function CountUp({ value, duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(String(value))
  const target = match ? parseFloat(match[1]) : null
  const suffix = match ? match[2] : ''
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0

  const [display, setDisplay] = useState(target === null || reduce ? String(value) : `0${suffix}`)

  useEffect(() => {
    if (!inView || target === null || reduce) return
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${v.toFixed(decimals)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, target, suffix, decimals, duration, reduce])

  return <span ref={ref}>{display}</span>
}
