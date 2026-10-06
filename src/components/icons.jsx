export function GooglePlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#00D7FE" d="M3.6 1.8c-.3.3-.4.7-.4 1.3v17.8c0 .6.1 1 .4 1.3l.1.1 10-10v-.2L3.7 1.7l-.1.1Z" />
      <path fill="#FFCE00" d="m17 15.6-3.3-3.4v-.2L17 8.6l.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2-.1.2Z" />
      <path fill="#FF3A44" d="M17.1 15.5 13.7 12 3.6 22.2c.4.4 1 .4 1.7.1l11.8-6.8" />
      <path fill="#00F076" d="M17.1 8.6 5.3 1.9c-.7-.4-1.3-.3-1.7.1L13.7 12l3.4-3.4Z" />
    </svg>
  )
}

export function WindowsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  )
}

export function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.6 2.6 3.9 5.8 3.9 9.5s-1.3 6.9-3.9 9.5c-2.6-2.6-3.9-5.8-3.9-9.5S9.4 5.1 12 2.5Z" />
    </svg>
  )
}

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const ArrowRight = (p) => (
  <svg {...stroke} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowUpRight = (p) => (
  <svg {...stroke} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const Check = (p) => (
  <svg {...stroke} strokeWidth={2.4} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
)
export const Play = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5Z" /></svg>
)
export const Video = (p) => (
  <svg {...stroke} {...p}><rect x="2.5" y="5.5" width="13" height="13" rx="2.5" /><path d="m15.5 10 6-3.5v11l-6-3.5" /></svg>
)
export const BookOpen = (p) => (
  <svg {...stroke} {...p}><path d="M12 6.5C10 5 7 4.5 3 4.5v14c4 0 7 .5 9 2 2-1.5 5-2 9-2v-14c-4 0-7 .5-9 2Z" /><path d="M12 6.5v14" /></svg>
)
export const ClipboardCheck = (p) => (
  <svg {...stroke} {...p}><rect x="4.5" y="4" width="15" height="17.5" rx="2.5" /><path d="M9 4V2.5h6V4M8.5 13l2.5 2.5 4.5-5" /></svg>
)
export const ChartUp = (p) => (
  <svg {...stroke} {...p}><path d="M3 20.5h18M6 16l4-5 3.5 3L19 7" /><path d="M15 7h4v4" /></svg>
)
export const Bell = (p) => (
  <svg {...stroke} {...p}><path d="M6 9.5a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15.5 6 9.5Z" /><path d="M10 20.5a2.2 2.2 0 0 0 4 0" /></svg>
)
export const Sync = (p) => (
  <svg {...stroke} {...p}><path d="M20 11a8 8 0 0 0-14.3-4.6L4 8.5M4 13a8 8 0 0 0 14.3 4.6L20 15.5" /><path d="M4 3.5v5h5M20 20.5v-5h-5" /></svg>
)
export const Shield = (p) => (
  <svg {...stroke} {...p}><path d="M12 2.5 4 5.5v6c0 5 3.4 9 8 10.5 4.6-1.5 8-5.5 8-10.5v-6l-8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
)
export const Download = (p) => (
  <svg {...stroke} {...p}><path d="M12 3.5v12M7 10.5l5 5 5-5M4 20.5h16" /></svg>
)
export const LogIn = (p) => (
  <svg {...stroke} {...p}><path d="M14 3.5h4.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H14M10 16.5l4.5-4.5L10 7.5M14.5 12H3.5" /></svg>
)
export const Menu = (p) => (
  <svg {...stroke} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const Close = (p) => (
  <svg {...stroke} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Plus = (p) => (
  <svg {...stroke} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
