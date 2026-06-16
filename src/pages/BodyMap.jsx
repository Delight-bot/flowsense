import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ChevronDown, MessageCircle } from 'lucide-react'
import { bodyZones, riskColor } from '../data/biomarkers.js'

// Elegant line-art female silhouette (front view).
function Silhouette() {
  return (
    <svg viewBox="0 0 100 200" className="h-full w-full" fill="none">
      <path
        d="M50 6
           C44 6 40 11 40 17 C40 23 44 28 50 28 C56 28 60 23 60 17 C60 11 56 6 50 6 Z"
        stroke="#C4A7E7"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <path
        d="M50 28
           C46 28 44 30 43 33
           C36 35 30 38 28 44
           C26 50 27 60 29 70
           C30 75 31 78 30 82
           C28 92 27 100 28 104
           C29 107 32 107 33 104
           C34 98 35 90 37 84
           C37 92 36 102 37 112
           C38 124 40 138 41 150
           C41 162 40 176 41 188
           C41 193 47 193 47 188
           C48 176 49 162 50 152
           C51 162 52 176 53 188
           C53 193 59 193 59 188
           C60 176 59 162 59 150
           C60 138 62 124 63 112
           C64 102 63 92 63 84
           C65 90 66 98 67 104
           C68 107 71 107 72 104
           C73 100 72 92 70 82
           C69 78 70 75 71 70
           C73 60 74 50 72 44
           C70 38 64 35 57 33
           C56 30 54 28 50 28 Z"
        stroke="#C4A7E7"
        strokeWidth="0.9"
        opacity="0.7"
        fill="#9B2D8E"
        fillOpacity="0.08"
      />
    </svg>
  )
}

export default function BodyMap() {
  const navigate = useNavigate()
  const [active, setActive] = useState(null)
  const [noteOpen, setNoteOpen] = useState(false)
  const zone = bodyZones.find((z) => z.id === active)

  return (
    <div className="relative px-4 pt-6">
      <h1 className="text-2xl font-bold">Body Map</h1>
      <p className="mt-1 text-sm text-muted">
        Tap a zone to see the hormone behind the symptom.
      </p>

      {/* Body + hotspots */}
      <div className="relative mx-auto mt-6 h-[460px] w-[230px]">
        <Silhouette />
        {bodyZones.map((z) => (
          <button
            key={z.id}
            onClick={() => setActive(z.id)}
            aria-label={z.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${z.cx}%`, top: `${z.cy}%` }}
          >
            <span
              className={`block h-6 w-6 rounded-full transition ${
                active === z.id ? 'scale-125' : ''
              }`}
              style={{
                backgroundColor: `${riskColor[z.risk]}55`,
                boxShadow: `0 0 12px ${riskColor[z.risk]}`,
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full"
              style={{ backgroundColor: riskColor[z.risk] }}
            />
          </button>
        ))}
      </div>

      {/* Microfluidics note (collapsible) */}
      <div className="mt-6 rounded-2xl bg-card p-4 shadow-glow">
        <button
          onClick={() => setNoteOpen((o) => !o)}
          className="flex w-full items-center justify-between text-left text-sm font-bold text-blush"
        >
          How does FlowSense know this?
          <ChevronDown size={18} className={`transition-transform ${noteOpen ? 'rotate-180' : ''}`} />
        </button>
        {noteOpen && (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            FlowSense detects these symptoms' root hormonal causes from menstrual fluid —
            passively, using the same lateral flow wicking technology as rapid COVID tests.
            The pad does the science. You get the answers.
          </p>
        )}
      </div>

      {/* Bottom drawer */}
      {zone && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setActive(null)}
          />
          <div className="animate-slideUp fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-t-3xl bg-cardAlt p-6 shadow-glow lg:max-w-2xl">
            <button
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 text-muted hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="mb-1 flex items-center gap-3">
              <h2 className="text-xl font-bold">{zone.symptom}</h2>
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{ backgroundColor: `${riskColor[zone.risk]}22`, color: riskColor[zone.risk] }}
              >
                {zone.risk}
              </span>
            </div>
            <p className="text-xs uppercase tracking-wide text-muted">{zone.label}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/90">{zone.connection}</p>
            <div className="mt-4 rounded-xl bg-bg/60 p-3">
              <p className="text-xs text-muted">Relevant reading today</p>
              <p className="mt-1 text-sm font-semibold text-gold">{zone.biomarker}</p>
            </div>
            <button
              onClick={() => navigate(`/chat?q=${encodeURIComponent(`Tell me about my ${zone.symptom.toLowerCase()} — what's the hormone connection?`)}`)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid py-3.5 text-sm font-bold text-white shadow-glow-mint"
            >
              <MessageCircle size={16} /> Ask OvaAI about this
            </button>
          </div>
        </>
      )}
    </div>
  )
}
