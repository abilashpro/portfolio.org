/**
 * Device frames + neutral wireframe previews.
 *
 * When a real screenshot path is supplied (see data/portfolio.js) it is shown
 * inside the frame, lazy-loaded. Otherwise a wireframe that illustrates the
 * layout at that breakpoint is rendered — never a fabricated screenshot.
 */

function Screen({ src, alt, children }) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
  }
  return children
}

export function DesktopFrame({ src, alt, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink-850 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <span className="size-2 rounded-full bg-rose-400/70" />
        <span className="size-2 rounded-full bg-amber-400/70" />
        <span className="size-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-white/[0.05] ring-1 ring-white/[0.06]" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <Screen src={src} alt={alt}>
          {children}
        </Screen>
      </div>
    </div>
  )
}

export function TabletFrame({ src, alt, children, className = '' }) {
  return (
    <div className={`rounded-[1.4rem] border border-white/15 bg-ink-800 p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ${className}`}>
      <div className="aspect-[3/4] overflow-hidden rounded-[0.9rem] bg-white">
        <Screen src={src} alt={alt}>
          {children}
        </Screen>
      </div>
    </div>
  )
}

export function PhoneFrame({ src, alt, children, className = '' }) {
  // The notch is absolutely positioned, so the frame needs a positioning
  // context — unless the caller already positions it (e.g. `absolute`).
  const position = /absolute|fixed|sticky/.test(className) ? '' : 'relative'
  return (
    <div className={`${position} rounded-[1.9rem] border border-white/15 bg-ink-900 p-1.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ${className}`}>
      <span className="absolute top-2.5 left-1/2 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-ink-900" />
      <div className="aspect-[9/19] overflow-hidden rounded-[1.5rem] bg-white">
        <Screen src={src} alt={alt}>
          {/* Status-bar spacer so the notch doesn't cover the wireframe */}
          <div className="flex h-full flex-col pt-4">{children}</div>
        </Screen>
      </div>
    </div>
  )
}

/* ---------------------------- Wireframes ---------------------------- */

function Bar({ w = 'w-full', h = 'h-1.5', className = '' }) {
  return <div className={`sk ${w} ${h} ${className}`} />
}

function NavWire({ compact }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-[6%] py-[3%]">
      <div className="h-2 w-8 rounded bg-emerald-500" />
      {compact ? (
        <div className="flex flex-col gap-[3px]">
          <span className="block h-[2px] w-3 rounded bg-slate-400" />
          <span className="block h-[2px] w-3 rounded bg-slate-400" />
          <span className="block h-[2px] w-3 rounded bg-slate-400" />
        </div>
      ) : (
        <div className="flex gap-2">
          <Bar w="w-5" h="h-1" />
          <Bar w="w-5" h="h-1" />
          <Bar w="w-5" h="h-1" />
          <Bar w="w-5" h="h-1" />
        </div>
      )}
    </div>
  )
}

/** Promo: split hero + feature grid that reflows 3 → 2 → 1 columns. */
function PromoWire({ device }) {
  const mobile = device === 'mobile'
  const cols = device === 'desktop' ? 'grid-cols-3' : device === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'

  return (
    <div className="flex h-full flex-col bg-white">
      <NavWire compact={device !== 'desktop'} />
      <div className={`flex gap-[5%] px-[6%] py-[6%] ${mobile ? 'flex-col' : 'items-center'}`}>
        <div className="flex flex-1 flex-col gap-1.5">
          <Bar w="w-4/5" h="h-2.5" className="bg-slate-300" />
          <Bar w="w-3/5" h="h-2.5" className="bg-slate-300" />
          <Bar w="w-full" h="h-1" className="mt-1" />
          <Bar w="w-5/6" h="h-1" />
          <div className="mt-1.5 flex gap-1.5">
            <div className="h-2.5 w-10 rounded bg-emerald-500" />
            <div className="h-2.5 w-10 rounded border border-slate-300" />
          </div>
        </div>
        <div
          className={`rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 ${mobile ? 'aspect-[4/3] w-full' : 'aspect-square w-[38%]'}`}
        />
      </div>
      <div className={`grid gap-[4%] px-[6%] ${cols}`}>
        {Array.from({ length: mobile ? 2 : 3 }).map((_, i) => (
          <div key={i} className="rounded-md border border-slate-100 p-[8%]">
            <div className="mb-1.5 size-3 rounded bg-emerald-200" />
            <Bar w="w-3/4" h="h-1.5" className="bg-slate-300" />
            <Bar w="w-full" h="h-1" className="mt-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Dorsin: centered hero + service cards + stacked mobile navigation. */
function DorsinWire({ device }) {
  const cols = device === 'desktop' ? 'grid-cols-4' : device === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'
  const count = device === 'desktop' ? 4 : device === 'tablet' ? 4 : 3

  return (
    <div className="flex h-full flex-col bg-white">
      <NavWire compact={device === 'mobile'} />
      <div className="flex flex-col items-center gap-1.5 bg-gradient-to-b from-emerald-50 to-white px-[8%] py-[8%] text-center">
        <Bar w="w-3/4" h="h-2.5" className="bg-slate-300" />
        <Bar w="w-1/2" h="h-2.5" className="bg-slate-300" />
        <Bar w="w-5/6" h="h-1" className="mt-1" />
        <Bar w="w-2/3" h="h-1" />
        <div className="mt-2 h-2.5 w-12 rounded-full bg-emerald-500" />
      </div>
      <div className={`grid gap-[3%] px-[6%] py-[4%] ${cols}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`rounded-md border border-slate-100 p-[6%] ${device === 'mobile' ? 'flex items-center gap-1.5' : ''}`}
          >
            <div className={`size-3 shrink-0 rounded-full bg-emerald-200 ${device === 'mobile' ? '' : 'mb-1.5'}`} />
            <div className="flex-1">
              <Bar w="w-2/3" h="h-1.5" className="bg-slate-300" />
              <Bar w="w-full" h="h-1" className="mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Wireframe({ project, device }) {
  return project === 'dorsin' ? <DorsinWire device={device} /> : <PromoWire device={device} />
}
