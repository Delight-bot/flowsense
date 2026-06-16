import { useEffect, useState } from 'react'

const zones = [
  { label: 'Sample Intake', color: '#F28AC4', status: 'Wicking initiated…' },
  { label: 'Particle Filter', color: '#D4418E', status: 'Filtering…' },
  { label: 'Conjugate Pad', color: '#F5C842', status: 'Reagents activating…' },
  { label: 'Reaction Zones', color: '#9B2D8E', status: 'Reading zones…' },
  { label: 'Optical Reader', color: '#F5C842', status: 'Complete ✓' },
]

// Animated cross-section of the FlowSense strip. `playing` triggers the
// 6-second wicking sweep; calls onComplete when the fluid front finishes.
export default function WickingDiagram({ playing, onComplete }) {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!playing) {
      setActive(-1)
      return
    }
    const timers = zones.map((_, i) =>
      setTimeout(() => {
        setActive(i)
        if (i === zones.length - 1) onComplete?.()
      }, (i + 1) * 1100)
    )
    return () => timers.forEach(clearTimeout)
  }, [playing, onComplete])

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl bg-card p-4 shadow-glow">
        {/* fluid front sweep */}
        {playing && (
          <div className="animate-wick absolute top-0 z-20 h-full w-1 bg-blush shadow-[0_0_18px_6px_rgba(242,138,196,0.7)]" />
        )}
        {/* zone bars */}
        <div className="flex h-28 gap-1">
          {zones.map((z, i) => (
            <div
              key={z.label}
              className="relative flex flex-1 flex-col items-center justify-end rounded-lg transition-all duration-500"
              style={{
                backgroundColor: active >= i ? `${z.color}55` : `${z.color}18`,
                boxShadow: active === i ? `0 0 20px ${z.color}` : 'none',
              }}
            >
              <span className="px-1 pb-2 text-center text-[9px] font-semibold leading-tight text-white">
                {z.label}
              </span>
            </div>
          ))}
        </div>

        {/* WET / DRY zone divider */}
        <div className="relative mt-3 flex text-[10px] font-bold uppercase tracking-wide">
          <div className="flex-[3] text-center text-blush">Wet Zone — Disposable</div>
          <div className="mx-1 border-l-2 border-dashed border-muted/60" />
          <div className="flex-[2] text-center text-gold">Dry Zone — Reusable</div>
        </div>
      </div>

      {/* status text */}
      <p className="mt-4 text-center text-sm font-semibold text-blush">
        {active >= 0 ? zones[active].status : playing ? 'Initializing…' : 'Ready to connect'}
      </p>
    </div>
  )
}
