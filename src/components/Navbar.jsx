import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { links, navItems, profile } from '../data/portfolio'

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // A section is "active" when it crosses the middle band of the viewport.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

const sectionIds = navItems.map((item) => item.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <div
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-500 lg:rounded-full ${
          solid
            ? 'border-white/10 bg-ink-900/70 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="flex h-14 items-center justify-between pr-2 pl-4 sm:h-16 sm:pl-5">
          <a href="#home" className="group flex items-center gap-3 text-xl font-semibold tracking-tight text-white">
            <span className="relative size-11 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-[2px] shadow-[0_0_20px_-2px_rgb(52_211_153/0.7)] transition-transform duration-300 group-hover:scale-105">
              {profile.photo ? (
                <img src={profile.photo} alt="" width="44" height="44" className="size-full rounded-full bg-ink-900 object-cover" />
              ) : (
                <span className="grid size-full place-items-center rounded-full bg-ink-900 font-mono text-sm font-bold text-emerald-300">{profile.name[0]}</span>
              )}
            </span>
            <span>
              {profile.name}
              <span className="text-emerald-400">.</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <ul className="hidden items-center lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative isolate rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn-primary hidden !min-h-10 !px-4 !text-sm sm:inline-flex">
              Resume
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:border-white/20 hover:text-white lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 border-t border-white/[0.06] p-3">
                {navItems.map((item, i) => {
                  const isActive = active === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-base transition-colors ${
                          isActive ? 'bg-white/[0.07] text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                          {item.label}
                        </span>
                        {isActive && <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgb(52_211_153)]" />}
                      </a>
                    </motion.li>
                  )
                })}
                <li className="mt-2 sm:hidden">
                  <a href={links.resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Download Resume
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
