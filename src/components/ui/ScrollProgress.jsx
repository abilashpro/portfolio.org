import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin glowing bar at the very top showing page scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400 shadow-[0_0_12px_rgb(52_211_153/0.8)]"
    />
  )
}
