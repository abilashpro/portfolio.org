/**
 * Soft, slowly drifting glows for section backgrounds.
 * Pure CSS animation (transform only) so it stays cheap to render.
 * The parent section must be `relative isolate overflow-hidden`.
 */
const presets = {
  hero: [
    'top-[-14rem] left-1/2 -translate-x-1/2 size-[46rem] bg-emerald-500/[0.14]',
    'top-[10rem] right-[-14rem] size-[30rem] bg-cyan-500/[0.10] [animation-delay:-6s]',
    'bottom-[-12rem] left-[-10rem] size-[28rem] bg-teal-500/[0.08] [animation-delay:-12s]',
  ],
  soft: [
    'top-[-10rem] left-[-8rem] size-[28rem] bg-emerald-500/[0.07]',
    'bottom-[-10rem] right-[-8rem] size-[30rem] bg-cyan-500/[0.06] [animation-delay:-9s]',
  ],
}

export default function Blobs({ variant = 'soft' }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {presets[variant].map((cls) => (
        <div key={cls} className={`animate-blob absolute rounded-full blur-[120px] ${cls}`} />
      ))}
    </div>
  )
}
