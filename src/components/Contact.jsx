import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, CheckCircle2, Copy, Mail, Send } from 'lucide-react'
import { links } from '../data/portfolio'
import { gmailComposeUrl } from '../utils/email'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'
import Reveal from './ui/Reveal'
import { PaperPlaneIllustration } from './ui/Illustrations'
import SectionHeading from './ui/SectionHeading'

const initialValues = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

const contactItems = [
  { key: 'email', label: 'Email', icon: Mail, href: links.email && gmailComposeUrl({ to: links.email }), value: links.email },
  { key: 'github', label: 'GitHub', icon: GithubIcon, href: links.github, value: links.github?.replace(/^https?:\/\/(www\.)?/, '') },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, href: links.linkedin, value: links.linkedin?.replace(/^https?:\/\/(www\.)?/, '') },
].filter((item) => item.href)

function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy my email address:', email)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email copied' : 'Copy email address'}
      title={copied ? 'Copied!' : 'Copy email'}
      className={`grid w-12 shrink-0 place-items-center rounded-2xl border transition-colors ${
        copied ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-emerald-400/40 hover:text-emerald-300'
      }`}
    >
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
    </button>
  )
}

function Field({ id, label, error, as = 'input', className = '', ...props }) {
  const Tag = as
  const describedBy = error ? `${id}-error` : undefined
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs tracking-[0.12em] text-slate-400 uppercase">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`block w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-base text-white transition-colors placeholder:text-slate-600 focus:ring-4 focus:outline-none sm:text-[0.95rem] ${
          error ? 'border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/15' : 'border-white/10 hover:border-white/20 focus:border-emerald-400/70 focus:ring-emerald-400/15'
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={describedBy} className="mt-1.5 text-sm text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  // No backend: a valid submission opens Gmail in a new tab with the message
  // pre-filled. Swap this for an API call / form service if needed.
  const onSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }
    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    window.open(gmailComposeUrl({ to: links.email, subject: values.subject, body }), '_blank', 'noopener,noreferrer')
    setSent(true)
    setValues(initialValues)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative isolate overflow-x-clip">
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -z-10 h-[30rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[140px]" />
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let's Connect"
          description="Have a project, role or question in mind? Send a message and I'll get back to you."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Contact info */}
          <Reveal className="min-w-0">
            <div className="card h-full p-6 sm:p-8">
              <PaperPlaneIllustration className="-mt-2 mb-4 h-auto w-full max-w-xs" />
              <h3 className="text-2xl font-semibold">Get in touch</h3>
              <p className="mt-2 leading-relaxed text-slate-400">
                I&apos;m open to frontend and React.js opportunities, collaborations and freelance projects.
              </p>
              <ul className="mt-6 space-y-3">
                {contactItems.map(({ key, label, icon: Icon, href, value }) => (
                  <li key={key} className="flex gap-2">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-w-0 flex-1 items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/[0.04]"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-colors group-hover:bg-emerald-400 group-hover:text-ink-950">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.65rem] tracking-[0.14em] text-slate-500 uppercase">{label}</span>
                        <span className="block truncate text-slate-200">{value}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-300" aria-hidden="true" />
                    </a>
                    {key === 'email' && <CopyEmailButton email={value} />}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="min-w-0">
            <form noValidate onSubmit={onSubmit} className="card relative h-full overflow-hidden p-6 sm:p-8" aria-label="Contact form">
              <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" autoComplete="name" placeholder="Your name" value={values.name} onChange={onChange} error={errors.name} />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={onChange}
                  error={errors.email}
                />
                <div className="sm:col-span-2">
                  <Field id="subject" label="Subject" placeholder="What's this about?" value={values.subject} onChange={onChange} error={errors.subject} />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    id="message"
                    label="Message"
                    as="textarea"
                    rows={5}
                    placeholder="Tell me a little about your project or role…"
                    value={values.message}
                    onChange={onChange}
                    error={errors.message}
                    className="resize-y"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <Send size={17} aria-hidden="true" />
                  Send Message
                </button>
                <AnimatePresence>
                  {sent && (
                    <motion.p
                      role="status"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-emerald-300"
                    >
                      <CheckCircle2 size={18} aria-hidden="true" />
                      Gmail opened in a new tab with your message ready to send.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
