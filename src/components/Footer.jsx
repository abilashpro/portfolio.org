import { ArrowUp, Mail } from 'lucide-react'
import { links, profile } from '../data/portfolio'
import { gmailComposeUrl } from '../utils/email'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'

const footerNav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const socials = [
  { label: 'GitHub', href: links.github, icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: links.linkedin, icon: LinkedinIcon, external: true },
  { label: 'Email', href: links.email && gmailComposeUrl({ to: links.email }), icon: Mail, external: true },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.06]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="container-page pt-14 sm:pt-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl font-semibold tracking-tight text-white">
              {profile.name}
              <span className="text-emerald-400">.</span>
            </a>
            <p className="mt-1 text-sm text-slate-500">{profile.role}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-slate-600">© 2026 {profile.name}. All rights reserved.</p>
          <a href="#home" className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white">
            Back to top
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-6 -mb-[0.22em] bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center text-[24vw] leading-none font-semibold tracking-[-0.06em] text-transparent select-none"
      >
        {profile.name.toLowerCase()}
      </p>
    </footer>
  )
}
