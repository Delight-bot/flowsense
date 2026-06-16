import { useState } from 'react'
import { ChevronDown, Cpu } from 'lucide-react'
import { stripZones, readerSpecs, biomarkers } from '../data/biomarkers.js'

const statusStyle = {
  Active: { label: 'Reacting…', color: '#F5C842' },
  Complete: { label: 'Saturated ✓', color: '#4ADE80' },
  Reading: { label: 'Reading…', color: '#9B2D8E' },
}

export default function Wicking() {
  const [open, setOpen] = useState(null)

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold">Live Sensor View</h1>
      <p className="mt-1 text-sm text-muted">
        The invisible microfluidic science, made visible.
      </p>

      {/* Current strip status, animated cross section */}
      <div className="mt-6 rounded-2xl bg-card p-4 shadow-glow">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
          Current Strip Status
        </h2>
        <div className="flex h-36 gap-1.5">
          {stripZones.map((z, i) => {
            const st = statusStyle[z.status]
            return (
              <div
                key={z.id}
                className="relative flex flex-1 flex-col justify-end overflow-hidden rounded-lg"
                style={{ backgroundColor: `${z.color}1f` }}
              >
                {/* animated saturation fill */}
                <div
                  className="animate-fillUp w-full"
                  style={{
                    backgroundColor: `${z.color}66`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
                <div className="absolute inset-x-0 top-1 px-1 text-center">
                  <span className="text-[9px] font-bold leading-tight text-white">{z.id}</span>
                </div>
                <div className="absolute inset-x-0 bottom-1 px-0.5 text-center">
                  <span className="text-[8px] font-semibold leading-none" style={{ color: st.color }}>
                    {st.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Zone detail cards */}
      <h2 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-muted">
        Zone Detail
      </h2>
      <div className="flex flex-col gap-3">
        {stripZones.map((z) => {
          const st = statusStyle[z.status]
          const isOpen = open === z.id
          return (
            <div key={z.id} className="overflow-hidden rounded-2xl bg-card shadow-glow">
              <button
                onClick={() => setOpen(isOpen ? null : z.id)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
                    style={{ backgroundColor: `${z.color}33`, color: z.color }}
                  >
                    {z.id}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{z.name}</p>
                    <p className="text-xs text-muted">{z.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                    style={{ backgroundColor: `${st.color}22`, color: st.color }}
                  >
                    {st.label}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <p className="text-sm leading-relaxed text-muted">{z.detail}</p>
                  {z.id === 4 && (
                    <div className="mt-3 space-y-2">
                      {biomarkers.map((b) => (
                        <div key={b.key} className="flex items-center gap-2">
                          <span className="w-28 flex-shrink-0 text-xs text-muted">{b.name}</span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cardAlt">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(100, (b.value / (b.value + 40)) * 100)}%`,
                                backgroundColor: b.color,
                                boxShadow: `0 0 8px ${b.color}`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Reader module specs */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-card to-cardAlt p-5 shadow-glow">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-blush">
          <Cpu size={16} /> Reader Module Specs
        </div>
        <div className="divide-y divide-muted/15">
          {readerSpecs.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 py-2 text-sm">
              <span className="text-muted">{k}</span>
              <span className="text-right font-medium text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
