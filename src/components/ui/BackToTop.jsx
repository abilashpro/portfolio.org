import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          className="fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full border border-white/10 bg-ink-800/80 text-white shadow-lg backdrop-blur-xl transition-colors hover:border-emerald-400/50 hover:text-emerald-300 sm:right-6 sm:bottom-6"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
