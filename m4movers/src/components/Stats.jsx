import { stats } from '../data/content'
import Counter from './Counter'

export default function Stats() {
  return (
    <div className="relative -mt-10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-soft grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100">
          {stats.map((s) => (
            <div key={s.label} className="p-6 sm:p-8 text-center">
              <p className="font-display font-bold text-3xl sm:text-4xl text-navy">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-ink-soft mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
