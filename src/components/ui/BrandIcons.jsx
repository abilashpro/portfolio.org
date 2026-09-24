// Brand marks are not part of lucide-react, so they are inlined here as small
// SVG components that accept the same size/className props as lucide icons.

export function GithubIcon({ size = 20, className = '', ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...rest}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12.24c0 5.19 3.3 9.6 7.86 11.15.58.11.79-.26.79-.57v-2.01c-3.2.71-3.87-1.4-3.87-1.4-.53-1.36-1.28-1.72-1.28-1.72-1.05-.73.08-.71.08-.71 1.16.08 1.77 1.21 1.77 1.21 1.03 1.8 2.7 1.28 3.36.98.1-.76.4-1.28.73-1.58-2.55-.3-5.24-1.3-5.24-5.78 0-1.28.45-2.32 1.19-3.14-.12-.3-.52-1.49.11-3.1 0 0 .97-.32 3.17 1.2a10.8 10.8 0 0 1 5.77 0c2.2-1.52 3.17-1.2 3.17-1.2.63 1.61.23 2.8.11 3.1.74.82 1.19 1.86 1.19 3.14 0 4.5-2.7 5.47-5.26 5.76.41.36.78 1.07.78 2.17v3.21c0 .31.21.69.8.57A11.75 11.75 0 0 0 23.5 12.24 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ size = 20, className = '', ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...rest}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
