import { useState } from 'react'
import { GooglePlayIcon, WindowsIcon, GlobeIcon, Play, Check, Video } from './icons.jsx'

/*
 * Set `url` for each guide to either:
 *   - a YouTube link  (https://www.youtube.com/watch?v=XXXX, https://youtu.be/XXXX, or a /shorts/ link)
 *   - a video file    (e.g. '/videos/android-guide.mp4' placed in the public/videos folder)
 * Leave it empty to show a "coming soon" placeholder.
 * `poster` is optional — a thumbnail image for video files (YouTube thumbnails are automatic).
 */
export const GUIDES = [
  {
    id: 'android',
    tab: 'Android app',
    Icon: GooglePlayIcon,
    title: 'How to use FOCAS on your Android phone',
    text: 'A quick walkthrough of installing the app from Google Play, signing in and finding your classes.',
    url: 'https://vz-1b4abbd6-5f1.b-cdn.net/bdd88dfe-9fb1-4b92-94f8-1cd5f497fd48/playlist.m3u8',
    poster: '',
    topics: ['Install from Google Play', 'Sign in with your FOCAS account', 'Join live & recorded classes', 'Download notes and take tests'],
  },
  {
    id: 'windows',
    tab: 'Windows app',
    Icon: WindowsIcon,
    title: 'How to use FOCAS on your Windows PC',
    text: 'Set up the desktop app from the Microsoft Store and get the most out of big-screen learning.',
    url: '',
    poster: '',
    topics: ['Install from Microsoft Store', 'Sign in and open your courses', 'Watch lectures in full screen', 'Attempt tests and track progress'],
  },
  {
    id: 'web',
    tab: 'Web app',
    Icon: GlobeIcon,
    title: 'How to use the FOCAS web app',
    text: 'Learn from any browser — no installation needed. Ideal for Mac, iPhone and iPad users.',
    url: '',
    poster: '',
    topics: ['Open app.focasedu.com', 'Sign in from any browser', 'Navigate your dashboard', 'Access classes, notes & tests'],
  },
]

function youTubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

function Player({ guide }) {
  const [playing, setPlaying] = useState(false)
  const ytId = guide.url ? youTubeId(guide.url) : null

  if (!guide.url) {
    return (
      <div className="relative flex size-full flex-col items-center justify-center bg-gradient-to-br from-brand-600 to-brand-900 p-6 text-center text-white">
        <div aria-hidden="true" className="grid-bg absolute inset-0" />
        <div className="relative flex size-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
          <Video className="size-7" />
        </div>
        <p className="relative mt-4 text-lg font-bold">Video guide coming soon</p>
        <p className="relative mt-1 text-sm text-brand-100/80">We&apos;re putting the finishing touches on this tutorial.</p>
      </div>
    )
  }

  if (!ytId) {
    return (
      <video
        key={guide.url}
        className="size-full bg-black object-contain"
        src={guide.url}
        poster={guide.poster || undefined}
        controls
        preload="metadata"
        playsInline
      >
        Your browser does not support embedded videos.
      </video>
    )
  }

  if (playing) {
    return (
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
        title={guide.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  // Lightweight facade: only load the YouTube player when the user clicks play.
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block size-full focus-visible:outline-none"
      aria-label={`Play video: ${guide.title}`}
    >
      <img
        src={guide.poster || `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl transition group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-brand-200">
        <Play className="ml-1 size-8 text-brand-600" />
      </span>
      <span className="absolute bottom-4 left-5 right-5 text-left text-sm font-semibold text-white sm:text-base">{guide.title}</span>
    </button>
  )
}

export default function VideoGuides({ active, onChange }) {
  const guide = GUIDES.find((g) => g.id === active) ?? GUIDES[0]

  return (
    <section id="guides" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-600">Video guides</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">See how it works</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Short step-by-step videos to help you get started on your phone, PC or browser.
          </p>
        </div>

        {/* tabs */}
        <div className="reveal mt-10 flex justify-center">
          <div role="tablist" aria-label="Choose a video guide" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1.5 ring-1 ring-slate-200">
            {GUIDES.map((g) => {
              const selected = g.id === guide.id
              return (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  id={`guide-tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls="guide-panel"
                  onClick={() => onChange(g.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 sm:px-5 ${
                    selected ? 'bg-white text-brand-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <g.Icon className={`size-4 ${g.id === 'web' && selected ? 'text-brand-600' : ''}`} />
                  {g.tab}
                </button>
              )
            })}
          </div>
        </div>

        {/* panel */}
        <div
          id="guide-panel"
          role="tabpanel"
          aria-labelledby={`guide-tab-${guide.id}`}
          className="reveal mt-10 grid items-center gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12"
        >
          <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-brand-900/20 ring-1 ring-slate-200">
            <div className="aspect-video">
              <Player key={guide.id} guide={guide} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{guide.title}</h3>
            <p className="mt-3 leading-relaxed text-slate-600">{guide.text}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">In this video</p>
            <ol className="mt-3 space-y-3">
              {guide.topics.map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-slate-700">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Check className="size-4 text-accent-500" />
              Switch tabs above to see the guide for another device.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
