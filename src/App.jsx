import { useEffect, useState } from 'react'
import logo from './assets/focas-logo.png'
import logoWhite from './assets/focas-logo-white.png'
import DeviceMockups from './components/DeviceMockups.jsx'
import VideoGuides from './components/VideoGuides.jsx'
import {
  GooglePlayIcon,
  WindowsIcon,
  GlobeIcon,
  ArrowRight,
  ArrowUpRight,
  Check,
  Video,
  Play,
  BookOpen,
  ClipboardCheck,
  ChartUp,
  Bell,
  Sync,
  Shield,
  Download,
  LogIn,
  Menu,
  Close,
  Plus,
} from './components/icons.jsx'

const LINKS = {
  android: 'https://play.google.com/store/apps/details?id=com.focasedu.lms',
  windows: 'https://apps.microsoft.com/detail/9NX5KN38HTRW',
  web: 'https://app.focasedu.com',
}

const PLATFORMS = [
  {
    id: 'android',
    name: 'Android',
    store: 'Google Play',
    Icon: GooglePlayIcon,
    href: LINKS.android,
    cta: 'Get it on Google Play',
    CtaIcon: Download,
    blurb: 'Study on the go. Watch lectures, attend live classes and take tests from your phone.',
    points: ['Live & recorded classes', 'Push reminders for classes', 'Learn on mobile data or Wi-Fi'],
  },
  {
    id: 'windows',
    name: 'Windows',
    store: 'Microsoft Store',
    Icon: WindowsIcon,
    href: LINKS.windows,
    cta: 'Get it from Microsoft',
    CtaIcon: Download,
    blurb: 'A focused, full-screen classroom on your laptop or desktop — built for long study sessions.',
    points: ['Big-screen lecture playback', 'Distraction-free desktop app', 'Easy install & auto-updates'],
  },
  {
    id: 'web',
    name: 'Web',
    store: 'app.focasedu.com',
    Icon: GlobeIcon,
    href: LINKS.web,
    cta: 'Open web app',
    CtaIcon: LogIn,
    blurb: 'Nothing to install. Sign in from any browser on Mac, Windows, Linux, iPhone or iPad.',
    points: ['Works in any modern browser', 'Ideal for Mac & iOS users', 'Instant access, always up to date'],
  },
]

const FEATURES = [
  { Icon: Video, title: 'Live & recorded classes', text: 'Join live sessions with faculty, or replay any lecture whenever it suits your schedule.' },
  { Icon: BookOpen, title: 'Notes & study material', text: 'Chapter-wise notes, PDFs and revision material — organised and available in one place.' },
  { Icon: ClipboardCheck, title: 'Tests & mock exams', text: 'Practise with chapter tests and full-length mocks that mirror the real exam.' },
  { Icon: ChartUp, title: 'Track your progress', text: 'See what you have completed, what is pending and where you need more practice.' },
  { Icon: Bell, title: 'Never miss a class', text: 'Timely reminders for live classes, new uploads and upcoming tests.' },
  { Icon: Sync, title: 'One account, every device', text: 'Start a lecture on your phone and finish it on your laptop. Your progress follows you.' },
]

const STEPS = [
  { title: 'Choose your device', text: 'Download the Android or Windows app, or open the web app in your browser.' },
  { title: 'Sign in with your FOCAS account', text: 'Use the same login credentials provided at enrolment on every platform.' },
  { title: 'Start learning', text: 'Your courses, classes and tests are ready and waiting — pick up right where you left off.' },
]

const FAQS = [
  {
    q: 'Do I need a separate account for each app?',
    a: 'No. One FOCAS account works on Android, Windows and the web. Sign in with the same credentials everywhere and your progress stays in sync.',
  },
  {
    q: 'I use an iPhone, iPad or Mac. How do I access FOCAS?',
    a: 'Open app.focasedu.com in Safari or any modern browser. The web app gives you full access to your courses, classes and tests — no installation needed.',
  },
  {
    q: 'Which Windows versions are supported?',
    a: 'The FOCAS app is available on the Microsoft Store for Windows 10 and Windows 11 PCs. Click “Get it from Microsoft” and install it like any other Store app.',
  },
  {
    q: 'Are the apps free to download?',
    a: 'Yes. The apps are free to download. Access to course content depends on the course you are enrolled in with FOCAS.',
  },
  {
    q: 'I can’t sign in. What should I do?',
    a: 'Double-check the email or phone number registered at enrolment. If you still can’t sign in, contact the FOCAS support team and we’ll help you get back to learning.',
  },
]

function detectPlatform() {
  if (typeof navigator === 'undefined') return 'web'
  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  if (/iphone|ipad|ipod|macintosh|mac os x|linux|cros/i.test(ua) && !/windows/i.test(ua)) return 'web'
  if (/windows/i.test(ua)) return 'windows'
  return 'web'
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const external = { target: '_blank', rel: 'noopener noreferrer' }

/* ---------- Store badges ---------- */

function StoreBadge({ platform, dark = false }) {
  const p = PLATFORMS.find((x) => x.id === platform)
  const top = { android: 'GET IT ON', windows: 'Get it from', web: 'Open in browser' }[platform]
  const bottom = { android: 'Google Play', windows: 'Microsoft', web: 'Web App' }[platform]
  return (
    <a
      href={p.href}
      {...external}
      aria-label={`${p.cta} (opens in a new tab)`}
      className={`group inline-flex h-14 min-w-[172px] items-center gap-3 rounded-xl px-4 transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 ${
        dark
          ? 'bg-white text-slate-900 shadow-lg shadow-black/20 hover:bg-slate-50 focus-visible:ring-white/40'
          : 'bg-slate-950 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 focus-visible:ring-brand-200'
      }`}
    >
      <p.Icon className={`size-7 shrink-0 ${platform === 'web' ? (dark ? 'text-brand-600' : 'text-accent-400') : ''}`} />
      <span className="flex flex-col text-left leading-none">
        <span className={`text-[10px] font-medium ${dark ? 'text-slate-500' : 'text-white/70'}`}>{top}</span>
        <span className="mt-1 text-[17px] font-semibold tracking-tight">{bottom}</span>
      </span>
    </a>
  )
}

/* ---------- Header ---------- */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    ['Download', '#download'],
    ['Video guides', '#guides'],
    ['Features', '#features'],
    ['How it works', '#how-it-works'],
    ['FAQ', '#faq'],
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-slate-200/80 bg-white/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center" aria-label="FOCAS home">
          <img src={logo} alt="FOCAS — Your last attempt" className="h-8 w-auto sm:h-10" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={LINKS.web}
            {...external}
            className="hidden items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 sm:inline-flex"
          >
            Sign in
            <ArrowRight className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-slate-200 bg-white px-4 pb-5 pt-2 md:hidden" aria-label="Mobile">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              {label}
            </a>
          ))}
          <a
            href={LINKS.web}
            {...external}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-base font-semibold text-white"
          >
            Sign in to web app
            <ArrowRight className="size-4" />
          </a>
        </nav>
      )}
    </header>
  )
}

/* ---------- Hero ---------- */

function Hero({ detected }) {
  const primary = PLATFORMS.find((p) => p.id === detected)
  const others = PLATFORMS.map((p) => p.id).filter((id) => id !== detected)

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute -right-40 -top-40 size-[560px] rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -left-32 top-48 size-[420px] rounded-full bg-accent-100/70 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(15 0 152 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 0 152 / 0.07) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pb-28">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 py-1 pl-1 pr-3.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur sm:text-sm">
            <span className="rounded-full bg-accent-500 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">New</span>
            Now on Android, Windows &amp; Web
          </div>

          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:mx-0 lg:text-6xl">
            Your FOCAS classroom,{' '}
            <span className="relative whitespace-nowrap text-brand-600">
              on every device
              <svg aria-hidden="true" viewBox="0 0 300 12" className="absolute -bottom-2 left-0 h-3 w-full text-accent-500" preserveAspectRatio="none">
                <path d="M2 9c60-6 180-8 296-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
            Live classes, recorded lectures, notes and mock tests — all in the FOCAS LMS. Download the app for
            your phone or PC, or jump straight in from your browser.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={primary.href}
              {...external}
              className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-brand-600 px-7 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 sm:w-auto"
            >
              <primary.CtaIcon className="size-5" />
              {detected === 'web' ? 'Open the web app' : `Download for ${primary.name}`}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Also available on</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {others.map((id) => (
              <StoreBadge key={id} platform={id} />
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 lg:justify-start">
            {['Free to download', 'One login for all devices', 'Progress syncs automatically'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-accent-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <DeviceMockups />
      </div>
    </section>
  )
}

/* ---------- Platforms ---------- */

function Platforms({ detected, onWatchGuide }) {
  return (
    <section id="download" className="scroll-mt-20 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Download"
          title="Pick your platform"
          text="Same courses, same account, same progress — choose whichever device you study on most."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLATFORMS.map((p, i) => {
            const recommended = p.id === detected
            return (
              <article
                key={p.id}
                className={`reveal relative flex flex-col rounded-3xl bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                  recommended
                    ? 'shadow-xl shadow-brand-600/10 ring-2 ring-brand-600'
                    : 'shadow-sm ring-1 ring-slate-200 hover:ring-brand-200'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {recommended && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    Recommended for your device
                  </span>
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={`flex size-14 items-center justify-center rounded-2xl ${
                      p.id === 'web' ? 'bg-brand-600 text-white' : 'bg-slate-50 ring-1 ring-slate-200'
                    }`}
                  >
                    <p.Icon className="size-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                    <p className="text-sm text-slate-500">{p.store}</p>
                  </div>
                </div>

                <p className="mt-5 leading-relaxed text-slate-600">{p.blurb}</p>

                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                        <Check className="size-3.5" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <a
                    href={p.href}
                    {...external}
                    className={`group flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 ${
                      recommended
                        ? 'bg-brand-600 text-white hover:bg-brand-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {p.cta}
                    <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#install-guide"
                    onClick={() => onWatchGuide(p.id)}
                    className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-brand-600 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200"
                  >
                    <Play className="size-3.5" />
                    Watch install video
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Features ---------- */

function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Everything in one place"
          title="Built to help you clear it this time"
          text="The FOCAS LMS brings every part of your preparation together, so you spend less time searching and more time studying."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-slate-200 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, text }, i) => (
            <div key={title} className="reveal group bg-white p-8 transition hover:bg-brand-50/40" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- How it works ---------- */

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
      <div aria-hidden="true" className="grid-bg absolute inset-0" />
      <div aria-hidden="true" className="absolute -right-24 top-0 size-96 rounded-full bg-brand-500/30 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-24 bottom-0 size-80 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Get started"
          title="Up and running in three steps"
          text="Already enrolled with FOCAS? You can start learning in under a minute."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="reveal relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent-500 text-lg font-extrabold text-white shadow-lg shadow-accent-500/30">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-brand-100/80">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex items-center justify-center gap-3 text-sm text-brand-100/70">
          <Shield className="size-5 text-accent-400" />
          Your account and learning data are protected with secure sign-in.
        </div>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

        <div className="mt-12 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-base font-semibold text-slate-900 transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-200 sm:px-8"
                  >
                    {f.q}
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen ? 'rotate-45 bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-slate-600 sm:px-8">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Final CTA ---------- */

function FinalCta() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-16 text-center shadow-2xl shadow-brand-900/30 sm:px-12 sm:py-20">
        <div aria-hidden="true" className="grid-bg absolute inset-0" />
        <div aria-hidden="true" className="absolute -right-20 -top-20 size-72 rounded-full bg-accent-400/25 blur-3xl" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Make this your last attempt.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-brand-100">
            Get the FOCAS app on your device and keep your preparation moving — anytime, anywhere.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge platform="android" dark />
            <StoreBadge platform="windows" dark />
            <StoreBadge platform="web" dark />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <img src={logoWhite} alt="FOCAS — Your last attempt" className="h-10 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            The official FOCAS Learning Management System — live classes, lectures, notes and tests for FOCAS students.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Get the app</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {PLATFORMS.map((p) => (
              <li key={p.id}>
                <a href={p.href} {...external} className="inline-flex items-center gap-2 transition hover:text-white">
                  {p.name === 'Web' ? 'Web app' : `${p.name} app`}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">FOCAS Edu</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="https://focasedu.com" {...external} className="inline-flex items-center gap-2 transition hover:text-white">
                focasedu.com <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            <li>
              <a href={LINKS.web} {...external} className="inline-flex items-center gap-2 transition hover:text-white">
                Student sign in <ArrowUpRight className="size-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} FOCAS Edu. All rights reserved.</p>
          <p>Google Play and Microsoft Store are trademarks of their respective owners.</p>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Shared ---------- */

function SectionHeading({ eyebrow, title, text, dark = false }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className={`text-sm font-bold uppercase tracking-[0.18em] ${dark ? 'text-accent-400' : 'text-accent-600'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-brand-100/80' : 'text-slate-600'}`}>{text}</p>}
    </div>
  )
}

export default function App() {
  const [detected] = useState(detectPlatform)
  const [guide, setGuide] = useState(detected)
  useReveal()

  return (
    <>
      <a
        href="#download"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand-700 focus:shadow-lg"
      >
        Skip to downloads
      </a>
      <Header />
      <main>
        <Hero detected={detected} />
        <Platforms detected={detected} onWatchGuide={setGuide} />
        <VideoGuides active={guide} onChange={setGuide} />
        <Features />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
