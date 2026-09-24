/**
 * Custom inline SVG illustrations in the site's dark emerald palette.
 * Inline SVG = crisp at any size, no extra requests, themable.
 */

const C = {
  e700: '#047857',
  e600: '#059669',
  e500: '#10b981',
  e300: '#6ee7b7',
  e100: '#0f3d31',
  e50: '#0b1512',
  t200: '#134e4a',
  s800: '#07090d',
  s700: '#94a3b8',
  s300: '#3b4452',
  s200: '#262d38',
  s100: '#1a202a',
  white: '#12171f',
  ink: '#ffffff',
}

/** About — laptop with component UI, phone, plant and floating tokens. */
export function WorkspaceIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 440 320" className={className} role="img" aria-label="Illustration of a developer workspace with a laptop showing a React UI and a phone showing the mobile layout">
      <defs>
        <linearGradient id="ws-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.e50} />
          <stop offset="1" stopColor="#f0fdfa" />
        </linearGradient>
        <linearGradient id="ws-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.white} />
          <stop offset="1" stopColor={C.s100} />
        </linearGradient>
        <filter id="ws-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* backdrop */}
      <rect x="20" y="20" width="400" height="280" rx="36" fill="url(#ws-bg)" />
      <circle cx="360" cy="70" r="46" fill={C.e100} opacity="0.7" />
      <circle cx="70" cy="250" r="30" fill={C.t200} opacity="0.35" />

      {/* desk line */}
      <rect x="40" y="262" width="360" height="6" rx="3" fill={C.s200} />

      {/* laptop */}
      <g filter="url(#ws-shadow)">
        <rect x="92" y="78" width="220" height="146" rx="12" fill={C.s800} />
        <rect x="100" y="86" width="204" height="130" rx="6" fill="url(#ws-screen)" />
        <path d="M72 226h260l-14 20H86z" fill={C.s300} />
        <rect x="178" y="228" width="48" height="5" rx="2.5" fill={C.s200} />
      </g>
      {/* laptop UI */}
      <rect x="100" y="86" width="204" height="18" rx="6" fill={C.white} />
      <circle cx="110" cy="95" r="3" fill={C.s300} />
      <circle cx="120" cy="95" r="3" fill={C.s300} />
      <circle cx="130" cy="95" r="3" fill={C.s300} />
      <rect x="112" y="116" width="84" height="8" rx="4" fill={C.s700} />
      <rect x="112" y="130" width="64" height="6" rx="3" fill={C.s300} />
      <rect x="112" y="144" width="40" height="12" rx="6" fill={C.e500} />
      <rect x="158" y="144" width="40" height="12" rx="6" fill={C.white} stroke={C.s300} />
      <rect x="214" y="114" width="78" height="46" rx="8" fill={C.e100} />
      <path d="M232 148l12-14 10 10 8-6 14 10" fill="none" stroke={C.e500} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={112 + i * 62} y="170" width="54" height="36" rx="6" fill={C.white} stroke={C.s200} />
          <rect x={119 + i * 62} y="177" width="10" height="10" rx="3" fill={C.e300} />
          <rect x={119 + i * 62} y="192" width="36" height="4" rx="2" fill={C.s300} />
        </g>
      ))}

      {/* phone */}
      <g filter="url(#ws-shadow)" className="animate-float-slow" style={{ transformBox: 'fill-box' }}>
        <rect x="318" y="126" width="72" height="136" rx="14" fill={C.s800} />
        <rect x="323" y="131" width="62" height="126" rx="10" fill={C.white} />
        <rect x="343" y="135" width="22" height="5" rx="2.5" fill={C.s800} />
        <rect x="331" y="148" width="20" height="5" rx="2.5" fill={C.e500} />
        <rect x="331" y="160" width="46" height="6" rx="3" fill={C.s700} />
        <rect x="331" y="170" width="34" height="4" rx="2" fill={C.s300} />
        <rect x="331" y="182" width="46" height="30" rx="6" fill={C.e100} />
        <rect x="331" y="218" width="46" height="14" rx="4" fill={C.white} stroke={C.s200} />
        <rect x="331" y="236" width="46" height="14" rx="4" fill={C.white} stroke={C.s200} />
      </g>

      {/* plant */}
      <path d="M58 262h36l-5-30H63z" fill={C.e600} />
      <path d="M76 232c-2-22-18-30-24-28 2 14 10 24 24 28z" fill={C.e300} />
      <path d="M76 232c2-26 18-36 26-34-2 16-12 28-26 34z" fill={C.e500} />
      <path d="M76 232c-1-18 2-34 8-40 4 12 0 30-8 40z" fill={C.e600} />

      {/* floating tokens */}
      <g className="animate-float" style={{ transformBox: 'fill-box' }}>
        <rect x="46" y="64" width="64" height="30" rx="10" fill={C.white} filter="url(#ws-shadow)" />
        <text x="78" y="84" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700" fill={C.e600}>
          {'</>'}
        </text>
      </g>
      <g className="animate-float-slow" style={{ transformBox: 'fill-box', animationDelay: '-3s' }}>
        <circle cx="262" cy="50" r="18" fill={C.white} filter="url(#ws-shadow)" />
        <g transform="translate(262 50)" fill="none" stroke={C.e500} strokeWidth="1.6">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
        <circle cx="262" cy="50" r="2" fill={C.e500} />
      </g>
    </svg>
  )
}

/* ---------------------- Service card illustrations ---------------------- */

function Frame({ children, label }) {
  return (
    <svg viewBox="0 0 160 96" className="h-full w-full" role="img" aria-label={label}>
      <rect x="0" y="0" width="160" height="96" rx="14" fill={C.e50} />
      <circle cx="140" cy="14" r="22" fill={C.e100} opacity="0.8" />
      {children}
    </svg>
  )
}

export function CodeArt() {
  return (
    <Frame label="Code editor illustration">
      <rect x="24" y="16" width="112" height="64" rx="8" fill={C.white} stroke={C.s200} />
      <rect x="24" y="16" width="112" height="12" rx="6" fill={C.s100} />
      <circle cx="33" cy="22" r="2" fill={C.s300} />
      <circle cx="40" cy="22" r="2" fill={C.s300} />
      <rect x="34" y="36" width="30" height="5" rx="2.5" fill="#a78bfa" />
      <rect x="68" y="36" width="36" height="5" rx="2.5" fill={C.s700} />
      <rect x="42" y="47" width="46" height="5" rx="2.5" fill={C.e500} />
      <rect x="42" y="58" width="30" height="5" rx="2.5" fill={C.e300} />
      <rect x="34" y="69" width="12" height="5" rx="2.5" fill={C.s300} />
      <path d="M112 48l-7 7 7 7M124 48l7 7-7 7" fill="none" stroke={C.e600} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  )
}

export function DevicesArt() {
  return (
    <Frame label="Desktop, tablet and mobile devices illustration">
      <rect x="16" y="18" width="80" height="52" rx="6" fill={C.s800} />
      <rect x="20" y="22" width="72" height="44" rx="3" fill={C.white} />
      <rect x="26" y="28" width="30" height="5" rx="2.5" fill={C.s700} />
      <rect x="26" y="38" width="22" height="4" rx="2" fill={C.s300} />
      <rect x="62" y="28" width="24" height="18" rx="3" fill={C.e100} />
      <rect x="26" y="52" width="18" height="8" rx="3" fill={C.e500} />
      <rect x="46" y="70" width="20" height="6" fill={C.s300} />
      <rect x="38" y="76" width="36" height="4" rx="2" fill={C.s300} />
      <rect x="92" y="34" width="36" height="48" rx="6" fill={C.s700} />
      <rect x="95" y="37" width="30" height="42" rx="3" fill={C.white} />
      <rect x="99" y="42" width="18" height="4" rx="2" fill={C.s700} />
      <rect x="99" y="50" width="22" height="12" rx="2" fill={C.e100} />
      <rect x="120" y="44" width="26" height="42" rx="7" fill={C.e700} />
      <rect x="123" y="48" width="20" height="34" rx="4" fill={C.white} />
      <rect x="126" y="53" width="12" height="3" rx="1.5" fill={C.e500} />
      <rect x="126" y="60" width="14" height="9" rx="2" fill={C.e100} />
      <rect x="126" y="72" width="14" height="4" rx="2" fill={C.s300} />
    </Frame>
  )
}

export function ComponentsArt() {
  return (
    <Frame label="UI components illustration with cards, toggle and button">
      <rect x="16" y="16" width="62" height="64" rx="8" fill={C.white} stroke={C.s200} />
      <circle cx="31" cy="31" r="7" fill={C.e300} />
      <rect x="42" y="27" width="28" height="4" rx="2" fill={C.s700} />
      <rect x="42" y="34" width="20" height="3" rx="1.5" fill={C.s300} />
      <rect x="24" y="46" width="46" height="4" rx="2" fill={C.s300} />
      <rect x="24" y="54" width="36" height="4" rx="2" fill={C.s300} />
      <rect x="24" y="64" width="28" height="9" rx="4.5" fill={C.e500} />
      <rect x="86" y="16" width="58" height="26" rx="8" fill={C.white} stroke={C.s200} />
      <rect x="94" y="26" width="22" height="5" rx="2.5" fill={C.s700} />
      <rect x="122" y="23" width="16" height="10" rx="5" fill={C.e500} />
      <circle cx="133" cy="28" r="3.5" fill={C.ink} />
      <rect x="86" y="50" width="58" height="30" rx="8" fill={C.white} stroke={C.s200} />
      <rect x="94" y="58" width="34" height="5" rx="2.5" fill={C.s300} />
      <path d="M134 58l3 3 3-3" fill="none" stroke={C.s700} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="94" y="68" width="42" height="5" rx="2.5" fill={C.e100} />
    </Frame>
  )
}

export function ApiArt() {
  return (
    <Frame label="API integration illustration connecting client and server">
      <path d="M50 48h60" stroke={C.e300} strokeWidth="2.5" strokeDasharray="4 5" />
      <path d="M50 48C70 24 90 24 110 48" fill="none" stroke={C.e500} strokeWidth="2" strokeDasharray="3 5" opacity="0.6" />
      <rect x="16" y="28" width="38" height="40" rx="8" fill={C.white} stroke={C.s200} />
      <rect x="23" y="36" width="24" height="4" rx="2" fill={C.s700} />
      <rect x="23" y="44" width="18" height="4" rx="2" fill={C.s300} />
      <rect x="23" y="54" width="14" height="7" rx="3" fill={C.e500} />
      <g>
        <rect x="106" y="24" width="38" height="14" rx="4" fill={C.s800} />
        <rect x="106" y="41" width="38" height="14" rx="4" fill={C.s800} />
        <rect x="106" y="58" width="38" height="14" rx="4" fill={C.s800} />
        <circle cx="113" cy="31" r="2" fill={C.e300} />
        <circle cx="113" cy="48" r="2" fill={C.e300} />
        <circle cx="113" cy="65" r="2" fill={C.e300} />
        <rect x="120" y="29" width="18" height="3" rx="1.5" fill={C.s700} />
        <rect x="120" y="46" width="18" height="3" rx="1.5" fill={C.s700} />
        <rect x="120" y="63" width="18" height="3" rx="1.5" fill={C.s700} />
      </g>
      <rect x="66" y="38" width="28" height="20" rx="6" fill={C.e600} />
      <text x="80" y="52" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={C.ink}>
        {'{ }'}
      </text>
    </Frame>
  )
}

/** Contact — envelope with a paper plane and dashed flight path. */
export function PaperPlaneIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 320 170" className={className} role="img" aria-label="Paper plane flying out of an envelope">
      <path d="M40 140C90 140 110 70 170 80S250 40 280 30" fill="none" stroke={C.e300} strokeWidth="2.5" strokeDasharray="6 8" strokeLinecap="round" />
      <g>
        <rect x="24" y="96" width="92" height="62" rx="10" fill={C.white} stroke={C.s200} strokeWidth="2" />
        <path d="M26 100l44 32 44-32" fill="none" stroke={C.e500} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="104" cy="104" r="10" fill={C.e500} />
        <text x="104" y="108.5" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill={C.ink}>
          1
        </text>
      </g>
      <g className="animate-float" style={{ transformBox: 'fill-box' }}>
        <path d="M252 20l52 -8-26 50-8-20z" fill={C.e500} />
        <path d="M252 20l18 22 34-30z" fill={C.e300} />
        <path d="M270 42l8 20-2-24z" fill={C.e700} />
      </g>
    </svg>
  )
}
