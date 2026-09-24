// `mailto:` links silently do nothing when the visitor has no desktop mail
// app configured, so email actions open Gmail's web composer instead.
export function gmailComposeUrl({ to, subject = '', body = '' }) {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to })
  if (subject) params.set('su', subject)
  if (body) params.set('body', body)
  return `https://mail.google.com/mail/?${params}`
}
