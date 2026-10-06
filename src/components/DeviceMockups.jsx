import heroImage from '../assets/focas-lms-hero.jpg'
import { Video, BookOpen, ClipboardCheck } from './icons.jsx'

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
    <div className="relative mx-auto w-full max-w-[640px] pb-10 pr-8 sm:pb-12 sm:pr-14 lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/60 via-white to-accent-100/70 blur-2xl" />

      <div className="animate-float-slow">
        <img
          src={heroImage}
          width="1600"
          height="1066"
          fetchPriority="high"
          alt="FOCAS LMS student dashboard on a laptop showing overall progress, attendance, test average, lecture watch time and subject-wise progress"
          className="w-full rounded-3xl shadow-2xl shadow-brand-900/25 ring-1 ring-slate-200"
        />
      </div>

      {/* Android phone */}
      <div className="absolute bottom-0 right-0 origin-bottom-right scale-[0.72] sm:scale-100">
        <div className="animate-float">
          <Phone />
        </div>
      </div>

      {/* floating badge */}
      <div className="absolute -left-3 bottom-4 hidden animate-float items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-xl ring-1 ring-slate-200 backdrop-blur [animation-delay:-3s] sm:flex lg:-left-10">
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
