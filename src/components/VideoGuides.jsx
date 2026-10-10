import { useEffect, useRef, useState } from 'react'
import { GooglePlayIcon, WindowsIcon, GlobeIcon, Play, Check, Video, ClipboardCheck, Download } from './icons.jsx'

/*
 * ─── ADD YOUR VIDEO LINKS HERE ────────────────────────────────────────────────
 * 5 videos in total:
 *   INSTALL_VIDEOS – how to install / open FOCAS, one per device
 *   USAGE_VIDEOS   – how to use FOCAS, one per student type (same UI on every device)
 *
 * Set `url` to either:
 *   - a Bunny Stream link (…/playlist.m3u8)
 *   - a YouTube link      (https://www.youtube.com/watch?v=XXXX, https://youtu.be/XXXX, or a /shorts/ link)
 *   - a video file        (e.g. '/videos/install-android.mp4' placed in the public/videos folder)
 * Leave it empty to show a "coming soon" placeholder.
 * `poster` is optional — a thumbnail image for video files (YouTube thumbnails are automatic).
 * `topics` is the "In this video" list shown next to the player.
 */
const INSTALL_VIDEOS = {
  android: {
    url: 'https://vz-1b4abbd6-5f1.b-cdn.net/bdd88dfe-9fb1-4b92-94f8-1cd5f497fd48/playlist.m3u8',
    poster: '',
    topics: ['Open Google Play on your phone', 'Search for “FOCAS” or use the link on this page', 'Tap Install and open the app', 'Sign in with your registered phone number'],
  },
  windows: {
    url: 'https://vz-1b4abbd6-5f1.b-cdn.net/c4161859-aaa8-4107-9a34-387e14541de7/playlist.m3u8',
    poster: '',
    topics: ['Open the Microsoft Store link on this page', 'Click Get / Install', 'Launch FOCAS from the Start menu', 'Sign in with your registered phone number'],
  },
  web: {
    url: 'https://vz-1b4abbd6-5f1.b-cdn.net/1ec9a871-7fc0-4895-b542-f8ad571c7730/playlist.m3u8',
    poster: '',
    topics: ['Sign in at app.focasedu.com from any browser', 'Find your courses on Home and My Courses', 'Tutor sessions & video lectures (class students)', 'Use Test Series, AI Practice and track your Progress'],
  },
}

const USAGE_VIDEOS = {
  tutor: {
    url: 'https://vz-1b4abbd6-5f1.b-cdn.net/1ec9a871-7fc0-4895-b542-f8ad571c7730/playlist.m3u8',
    poster: '',
    topics: ['Your dashboard and progress', 'Join tutor sessions and watch video lectures', 'Attendance and study plan', 'Study material, test practice and FOCAS Buddy'],
  },
  kit: {
    url: 'https://vz-1b4abbd6-5f1.b-cdn.net/e2944d3d-e245-45c7-bee5-97590fe76d67/playlist.m3u8',
    poster: '',
    topics: ['Sign in and find your kit', 'Practise with the Question Bank', 'Attempt the Test Series', 'Review your scores and results'],
  },
}
// ──────────────────────────────────────────────────────────────────────────────

const DEVICES = [
  { id: 'android', tab: 'Android', Icon: GooglePlayIcon, title: 'How to install FOCAS on Android', text: 'Get the FOCAS app from Google Play and sign in on your phone.' },
  { id: 'windows', tab: 'Windows', Icon: WindowsIcon, title: 'How to install FOCAS on Windows', text: 'Install the FOCAS desktop app from the Microsoft Store on your Windows PC.' },
  { id: 'web', tab: 'Web', Icon: GlobeIcon, title: 'How to use the FOCAS web app', text: 'No installation needed — open app.focasedu.com in any browser on Mac, Windows, iPhone or iPad and start learning.', note: 'The web app works in any browser — nothing to download.' },
]

const STUDENT_TYPES = [
  {
    id: 'tutor',
    label: 'Tutor Session students',
    text: 'Class-enrolled: tutor sessions & video lectures',
    title: 'How to use FOCAS — Tutor Session students',
    about: 'For students enrolled in FOCAS classes: a complete tour of tutor sessions, video lectures (recorded classes), attendance, study plan, study material and tests.',
    Icon: Video,
  },
  {
    id: 'kit',
    label: 'Kit students',
    text: 'Question Bank & Test Series',
    title: 'How to use FOCAS — Kit students',
    about: 'Your kit includes the Question Bank and Test Series. Tutor sessions and video lectures are only for class-enrolled students. This video shows how to practise questions and take tests.',
    Icon: ClipboardCheck,
  },
]

function youTubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

// Plays MP4 files directly, and HLS streams (.m3u8, e.g. Bunny Stream) natively on Safari/iOS
// or through hls.js elsewhere. hls.js is only downloaded when an HLS video is actually shown.
function FileVideo({ url, poster, onPortrait }) {
  const ref = useRef(null)
  const isHls = /\.m3u8(\?|$)/i.test(url)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (!isHls || video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
      return
    }
    let hls
    let cancelled = false
    import('hls.js').then(({ default: Hls }) => {
      if (cancelled) return
      if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(url)
        hls.attachMedia(video)
      } else {
        video.src = url
      }
    })
    return () => {
      cancelled = true
      hls?.destroy()
    }
  }, [url, isHls])

  return (
    <video
      ref={ref}
      className="size-full bg-transparent object-contain"
      poster={poster || undefined}
      controls
      preload="metadata"
      playsInline
      onLoadedMetadata={(e) => onPortrait(e.currentTarget.videoHeight > e.currentTarget.videoWidth)}
    >
      Your browser does not support embedded videos.
    </video>
  )
}

function Player({ video, title, onPortrait }) {
  const [playing, setPlaying] = useState(false)
  const ytId = video.url ? youTubeId(video.url) : null

  if (!video.url) {
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
    return <FileVideo key={video.url} url={video.url} poster={video.poster} onPortrait={onPortrait} />
  }

  if (playing) {
    return (
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
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
      aria-label={`Play video: ${title}`}
    >
      <img
        src={video.poster || `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl transition group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-brand-200">
        <Play className="ml-1 size-8 text-brand-600" />
      </span>
      <span className="absolute bottom-4 left-5 right-5 text-left text-sm font-semibold text-white sm:text-base">{title}</span>
    </button>
  )
}

/* Player + description, shared by both guide blocks. */
function GuidePanel({ id, labelledBy, videoKey, video, badge, title, text, note, alwaysWide = false }) {
  // Vertical (phone) recordings get a phone-shaped frame instead of a 16:9 one.
  const [portrait, setPortrait] = useState({})
  // `alwaysWide` keeps a consistent 16:9 frame (vertical videos are centred inside it).
  const isPortrait = !alwaysWide && portrait[videoKey]

  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy} className="mt-8 grid items-center gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
      <div
        className={`overflow-hidden bg-gradient-to-br from-brand-900 to-brand-950 shadow-2xl shadow-brand-900/20 ${
          isPortrait ? 'mx-auto w-full max-w-[300px] rounded-[2.25rem] p-2 ring-1 ring-slate-700' : 'rounded-3xl ring-1 ring-slate-200'
        }`}
      >
        <div className={isPortrait ? 'aspect-[9/19] overflow-hidden rounded-[1.75rem] bg-black' : 'aspect-video'}>
          <Player
            key={videoKey}
            video={video}
            title={title}
            onPortrait={(v) => setPortrait((p) => (p[videoKey] === v ? p : { ...p, [videoKey]: v }))}
          />
        </div>
      </div>

      <div>
        {badge}
        <h4 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{title}</h4>
        <p className="mt-3 leading-relaxed text-slate-600">{text}</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">In this video</p>
        <ol className="mt-3 space-y-3">
          {video.topics.map((t, i) => (
            <li key={t} className="flex items-center gap-3 text-slate-700">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
        {note && (
          <div className="mt-6 flex items-start gap-2 text-sm text-slate-500">
            <Check className="mt-0.5 size-4 shrink-0 text-accent-500" />
            {note}
          </div>
        )}
      </div>
    </div>
  )
}

function BlockHeading({ step, Icon, title, text }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-600 ring-1 ring-brand-100">
        <Icon className="size-3.5" />
        Step {step}
      </span>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h3>
      <p className="mt-2 max-w-xl text-slate-600">{text}</p>
    </div>
  )
}

export default function VideoGuides({ active, onChange }) {
  const device = DEVICES.find((d) => d.id === active) ?? DEVICES[0]
  const [studentType, setStudentType] = useState('tutor')
  const type = STUDENT_TYPES.find((s) => s.id === studentType)

  return (
    <section id="guides" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-600">Video guides</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">See how it works</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            First install FOCAS on your device, then watch the guide for your course type.
          </p>
        </div>

        {/* ── Step 1: install, per device ── */}
        <div id="install-guide" className="reveal mt-14 scroll-mt-24">
          <BlockHeading step={1} Icon={Download} title="Get started on your device" text="Pick your device to see how to install the app — or how to use FOCAS on the web." />

          <div className="mt-6 flex justify-center">
            <div role="tablist" aria-label="Choose a device" className="grid w-full grid-cols-3 gap-1 rounded-2xl bg-slate-100 p-1.5 ring-1 ring-slate-200 sm:inline-flex sm:w-auto">
              {DEVICES.map((d) => {
                const selected = d.id === device.id
                return (
                  <button
                    key={d.id}
                    type="button"
                    role="tab"
                    id={`guide-tab-${d.id}`}
                    aria-selected={selected}
                    aria-controls="install-panel"
                    onClick={() => onChange(d.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 sm:px-5 ${
                      selected ? 'bg-white text-brand-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <d.Icon className={`size-4 ${d.id === 'web' && selected ? 'text-brand-600' : ''}`} />
                    {d.tab}
                    <span className="-ml-1.5 hidden sm:inline"> app</span>
                  </button>
                )
              })}
            </div>
          </div>

          <GuidePanel
            id="install-panel"
            labelledBy={`guide-tab-${device.id}`}
            videoKey={`install-${device.id}`}
            video={INSTALL_VIDEOS[device.id]}
            title={device.title}
            text={device.text}
            note={device.note ?? 'Switch device above to see another install guide.'}
          />
        </div>

        <div aria-hidden="true" className="my-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent sm:my-20" />

        {/* ── Step 2: how to use, per student type ── */}
        <div className="reveal">
          <BlockHeading
            step={2}
            Icon={Play}
            title="How to use FOCAS"
            text="The app looks and works the same on Android, Windows and Web — choose your course type."
          />

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3" role="tablist" aria-label="Choose your course type">
            {STUDENT_TYPES.map((s) => {
              const selected = s.id === type.id
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`usage-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls="usage-panel"
                  onClick={() => setStudentType(s.id)}
                  className={`flex items-center gap-3 rounded-2xl p-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 sm:p-4 ${
                    selected ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-brand-300'
                  }`}
                >
                  <span
                    className={`hidden size-10 shrink-0 items-center justify-center rounded-xl sm:flex ${
                      selected ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-600'
                    }`}
                  >
                    <s.Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold sm:text-base">{s.label}</span>
                    <span className={`block text-xs sm:text-sm ${selected ? 'text-brand-100' : 'text-slate-500'}`}>{s.text}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <GuidePanel
            id="usage-panel"
            labelledBy={`usage-tab-${type.id}`}
            videoKey={`usage-${type.id}`}
            video={USAGE_VIDEOS[type.id]}
            badge={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700 ring-1 ring-accent-100">
                <type.Icon className="size-3.5" />
                For {type.label}
              </span>
            }
            title={type.title}
            text={type.about}
            note="Same screens on Android, Windows and Web — one video covers every device."
            alwaysWide
          />
        </div>
      </div>
    </section>
  )
}
