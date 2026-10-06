import logo from '../assets/focas-logo.png'
import { Play, Video, BookOpen, ClipboardCheck, Bell } from './icons.jsx'

const courses = [
  { title: 'Financial Reporting', progress: 72, tint: 'bg-brand-100 text-brand-600' },
  { title: 'Taxation', progress: 45, tint: 'bg-accent-100 text-accent-700' },
  { title: 'Audit & Assurance', progress: 88, tint: 'bg-amber-100 text-amber-700' },
]

function Laptop() {
  return (
    <div className="relative w-full">
      <div className="rounded-t-2xl border border-slate-300/70 bg-slate-900 p-2 shadow-2xl shadow-brand-900/30 sm:p-2.5">
        <div className="overflow-hidden rounded-lg bg-slate-50">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2">
            <span className="size-2 rounded-full bg-red-400" />
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="size-2 rounded-full bg-green-400" />
            <div className="ml-2 flex-1 truncate rounded-md bg-slate-100 px-2 py-0.5 text-[9px] text-slate-500 sm:text-[10px]">
              app.focasedu.com/dashboard
            </div>
          </div>

          <div className="flex">
            {/* sidebar */}
            <div className="hidden w-28 shrink-0 flex-col gap-1 border-r border-slate-200 bg-white p-2.5 sm:flex">
              <img src={logo} alt="" className="mb-2 h-5 w-auto self-start" />
              {['Dashboard', 'My Courses', 'Live Classes', 'Tests', 'Notes'].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-md px-2 py-1 text-[9px] font-medium ${
                    i === 0 ? 'bg-brand-600 text-white' : 'text-slate-500'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* content */}
            <div className="flex-1 space-y-2.5 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[8px] text-slate-400">Welcome back</div>
                  <div className="text-[11px] font-bold text-slate-800">Continue learning</div>
                </div>
                <Bell className="size-3.5 text-slate-400" />
              </div>

              <div className="relative flex h-20 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 sm:h-24">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="relative flex size-8 items-center justify-center rounded-full bg-white/95 shadow-lg">
                  <Play className="ml-0.5 size-3.5 text-brand-600" />
                </div>
                <div className="absolute bottom-1.5 left-2 text-[8px] font-semibold text-white/90">
                  Lecture 14 · Consolidation
                </div>
                <div className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-white/25">
                  <div className="h-full w-3/5 rounded-full bg-accent-400" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {courses.map((c) => (
                  <div key={c.title} className="rounded-md border border-slate-200 bg-white p-1.5">
                    <div className={`mb-1 inline-flex rounded px-1 text-[7px] font-semibold ${c.tint}`}>
                      {c.progress}%
                    </div>
                    <div className="truncate text-[8px] font-semibold text-slate-700">{c.title}</div>
                    <div className="mt-1 h-1 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-brand-600" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* base */}
      <div className="relative mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-xl bg-gradient-to-b from-slate-300 to-slate-400 shadow-lg">
        <div className="mx-auto h-1 w-20 rounded-b-md bg-slate-400/80" />
      </div>
    </div>
  )
}

function Phone() {
  return (
    <div className="w-[150px] rounded-[1.75rem] border border-slate-700 bg-slate-900 p-1.5 shadow-2xl shadow-brand-900/40 sm:w-[170px]">
      <div className="relative overflow-hidden rounded-[1.4rem] bg-slate-50">
        <div className="absolute left-1/2 top-1.5 z-10 h-3.5 w-12 -translate-x-1/2 rounded-full bg-slate-900" />
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-3 pb-4 pt-7 text-white">
          <div className="text-[8px] text-white/70">Today&apos;s goal</div>
          <div className="text-[11px] font-bold">2 of 3 lessons done</div>
          <div className="mt-2 h-1 rounded-full bg-white/20">
            <div className="h-full w-2/3 rounded-full bg-accent-400" />
          </div>
        </div>
        <div className="-mt-2.5 space-y-1.5 rounded-t-xl bg-slate-50 px-2.5 pb-3 pt-2.5">
          {[
            { Icon: Video, label: 'Live class at 7:00 PM', sub: 'Starts in 25 min', c: 'bg-red-50 text-red-500' },
            { Icon: BookOpen, label: 'Revision notes', sub: 'Chapter 6 · PDF', c: 'bg-brand-50 text-brand-600' },
            { Icon: ClipboardCheck, label: 'Mock test 3', sub: '50 questions', c: 'bg-accent-50 text-accent-600' },
          ].map(({ Icon, label, sub, c }) => (
            <div key={label} className="flex items-center gap-2 rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-200/70">
              <div className={`flex size-6 shrink-0 items-center justify-center rounded-md ${c}`}>
                <Icon className="size-3.5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[8.5px] font-semibold text-slate-800">{label}</div>
                <div className="text-[7.5px] text-slate-400">{sub}</div>
              </div>
            </div>
          ))}
          <div className="flex justify-around pt-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-1 w-4 rounded-full ${i === 0 ? 'bg-brand-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DeviceMockups() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] pb-6 pr-6 sm:pr-10">
      <div className="animate-float-slow">
        <Laptop />
      </div>
      <div className="absolute -bottom-2 right-0 animate-float">
        <Phone />
      </div>

      {/* floating badge */}
      <div className="absolute -left-2 top-8 hidden items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-xl ring-1 ring-slate-200 backdrop-blur sm:flex lg:-left-8">
        <div className="flex size-7 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
          <ClipboardCheck className="size-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-800">Progress synced</div>
          <div className="text-[10px] text-slate-500">Across all your devices</div>
        </div>
      </div>
    </div>
  )
}
