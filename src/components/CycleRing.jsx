import { cyclePhases } from '../data/biomarkers.js'

// SVG donut: 4 cycle-phase segments, active (Luteal) glows.
export default function CycleRing({ activePhase = 'Luteal' }) {
  const size = 200
  const stroke = 22
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const total = cyclePhases.reduce((s, p) => s + p.days, 0)
  const gap = 4 // visual gap between segments in deg-equivalent

  let offsetDays = 0
  const segments = cyclePhases.map((p) => {
    const fraction = p.days / total
    const len = circumference * fraction - gap
    const dashOffset = -(offsetDays / total) * circumference
    offsetDays += p.days
    return { ...p, len, dashOffset }
  })

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {segments.map((s) => {
          const isActive = s.name === activePhase
          return (
            <circle
              key={s.name}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={isActive ? stroke + 4 : stroke}
              strokeDasharray={`${s.len} ${circumference - s.len}`}
              strokeDashoffset={s.dashOffset}
              strokeLinecap="round"
              opacity={isActive ? 1 : 0.35}
              style={isActive ? { filter: `drop-shadow(0 0 8px ${s.color})` } : {}}
            />
          )
        })}
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-2xl font-bold text-gold">Day 22</span>
        <span className="text-sm font-semibold text-blush">{activePhase} Phase</span>
      </div>
    </div>
  )
}
