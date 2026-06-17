import { useEffect, useState } from 'react'

// ── SVG pad (top-view, like looking down at the pad) ──────────────────────
function PadGraphic({ spinning }) {
  return (
    <div
      className={`transition-opacity duration-700 ${spinning ? 'animate-spin-y' : ''}`}
      style={{ filter: 'drop-shadow(0 0 18px rgba(155,45,142,0.45))' }}
    >
      <svg viewBox="0 0 90 170" width="90" height="170" fill="none">
        {/* Pad body */}
        <rect x="10" y="5" width="70" height="160" rx="30" fill="white" fillOpacity="0.93" />
        {/* Wings */}
        <rect x="0"  y="62" width="13" height="32" rx="6" fill="white" fillOpacity="0.72" />
        <rect x="77" y="62" width="13" height="32" rx="6" fill="white" fillOpacity="0.72" />
        {/* Inner absorbent zone */}
        <rect x="22" y="20" width="46" height="112" rx="16" fill="#F0EAF8" />
        {/* Center dashed guide line */}
        <line x1="45" y1="26" x2="45" y2="120" stroke="#D8C4F0" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Sensor module (orchid chip at the base) */}
        <rect x="18" y="118" width="54" height="36" rx="9" fill="#9B2D8E" />
        <rect x="24" y="124" width="42" height="24" rx="5" fill="#7A1E7A" />
        {/* Chip trace lines */}
        <line x1="33" y1="124" x2="33" y2="148" stroke="#5A125A" strokeWidth="0.9" />
        <line x1="42" y1="124" x2="42" y2="148" stroke="#5A125A" strokeWidth="0.9" />
        <line x1="51" y1="124" x2="51" y2="148" stroke="#5A125A" strokeWidth="0.9" />
        <line x1="57" y1="124" x2="57" y2="148" stroke="#5A125A" strokeWidth="0.9" />
        {/* NFC label on chip */}
        <text x="45" y="139" textAnchor="middle" fontSize="7" fill="#F28AC4" fontWeight="700">NFC</text>
        {/* FlowSense brand on pad face */}
        <text x="45" y="74" textAnchor="middle" fontSize="6.5" fill="#9B2D8E" fontWeight="700" letterSpacing="0.6">FlowSense™</text>
        {/* Micro electrode dots (sensor detail) */}
        <circle cx="30" cy="90" r="2" fill="#C4A7E7" fillOpacity="0.5" />
        <circle cx="45" cy="90" r="2" fill="#C4A7E7" fillOpacity="0.5" />
        <circle cx="60" cy="90" r="2" fill="#C4A7E7" fillOpacity="0.5" />
      </svg>
    </div>
  )
}

// ── SVG phone silhouette ───────────────────────────────────────────────────
function PhoneGraphic({ lit }) {
  return (
    <div style={{ filter: lit ? 'drop-shadow(0 0 16px rgba(155,45,142,0.55))' : 'none', transition: 'filter 0.6s' }}>
      <svg viewBox="0 0 72 132" width="72" height="132" fill="none">
        {/* Body */}
        <rect x="2" y="2" width="68" height="128" rx="15"
          fill="#1C1C1E"
          stroke={lit ? '#9B2D8E' : '#3A3A3C'}
          strokeWidth={lit ? '2.5' : '1.8'}
        />
        {/* Screen */}
        <rect x="6" y="10" width="60" height="106" rx="11" fill="#1A0A2E" />
        {/* Dynamic Island */}
        <rect x="23" y="13" width="26" height="9" rx="4" fill="black" />

        {/* App UI — only when lit */}
        {lit && (
          <>
            {/* Header */}
            <rect x="10" y="28" width="52" height="7" rx="3" fill="#2D1545" />
            <rect x="10" y="39" width="30" height="4" rx="2" fill="#9B2D8E" fillOpacity="0.55" />
            {/* Hormone cards */}
            <rect x="10" y="48" width="23" height="20" rx="3" fill="#2D1545" />
            <rect x="37" y="48" width="23" height="20" rx="3" fill="#2D1545" />
            <rect x="10" y="72" width="23" height="20" rx="3" fill="#2D1545" />
            <rect x="37" y="72" width="23" height="20" rx="3" fill="#2D1545" />
            {/* Gold metric values */}
            <text x="21.5" y="62" textAnchor="middle" fontSize="6" fill="#F5C842" fontWeight="700">142</text>
            <text x="48.5" y="62" textAnchor="middle" fontSize="6" fill="#F5C842" fontWeight="700">8.4</text>
            <text x="21.5" y="86" textAnchor="middle" fontSize="6" fill="#F5C842" fontWeight="700">6.2</text>
            <text x="48.5" y="86" textAnchor="middle" fontSize="6" fill="#D4418E" fontWeight="700">18.6↑</text>
            {/* Bottom nav bar */}
            <rect x="6" y="100" width="60" height="14" rx="6" fill="#2D1545" />
            <circle cx="21" cy="107" r="3.5" fill="#9B2D8E" />
            <circle cx="36" cy="107" r="3" fill="#3A1C58" />
            <circle cx="51" cy="107" r="3" fill="#3A1C58" />
          </>
        )}

        {/* Home indicator */}
        <rect x="25" y="119" width="22" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
      </svg>
    </div>
  )
}

// ── NFC connection pulses ──────────────────────────────────────────────────
function ConnectionLine({ active }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative flex items-center">
        {/* Line */}
        <div className="h-[2px] w-10 rounded-full bg-gradient-to-r from-orchid to-blush sm:w-16" />
        {/* Travelling pulse */}
        {active && (
          <div className="absolute left-0 h-2 w-2 animate-ping rounded-full bg-blush opacity-75" />
        )}
        {/* Arrow head */}
        <div
          className="ml-0 h-0 w-0"
          style={{
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '8px solid #F28AC4',
          }}
        />
      </div>
      <span className="text-[9px] font-semibold tracking-wide text-muted/70">NFC · 13.56 MHz</span>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function IntroAnimation({ onDone }) {
  const [phase, setPhase] = useState(0)
  // 0 → black
  // 1 → pad fades in
  // 2 → pad spins 360°
  // 3 → connection line + phone slide in
  // 4 → phone lights up (app visible)
  // 5 → fade to landing

  useEffect(() => {
    const schedule = [
      [350,  1],   // pad appears
      [1050, 2],   // pad rotates
      [2500, 3],   // arrow + phone
      [3400, 4],   // phone lights up
      [4700, 5],   // fade out
    ]
    const timers = schedule.map(([ms, p]) => setTimeout(() => setPhase(p), ms))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase === 5) {
      const t = setTimeout(onDone, 650)
      return () => clearTimeout(t)
    }
  }, [phase, onDone])

  const captions = [
    '',
    'Meet the Flow Pad™',
    'Reading 5 hormones. Passively.',
    'Syncing via NFC…',
    'Connected. Your hormones, live.',
    '',
  ]
  const subs = [
    '',
    'The world\'s first biosensor feminine pad',
    'Electrochemical strip · microfluidic wicking · optical reader',
    'Reader module transfers your full panel in under 1 second',
    'Real-time hormone intelligence, delivered to your phone',
    '',
  ]

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        phase >= 5 ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-orchid/15 blur-3xl transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute right-1/4 top-1/3 h-56 w-56 rounded-full bg-rose/10 blur-3xl transition-opacity duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* ── Scene ── */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex items-center gap-5 sm:gap-10">

          {/* Pad */}
          <div className={`transition-opacity duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <PadGraphic spinning={phase >= 2} />
          </div>

          {/* Connection arrow */}
          <ConnectionLine active={phase >= 3} />

          {/* Phone */}
          <div
            className={`transition-all duration-700 ${phase >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
          >
            <PhoneGraphic lit={phase >= 4} />
          </div>
        </div>

        {/* Caption */}
        <div className={`text-center transition-all duration-500 ${phase >= 1 && phase < 5 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-base font-bold text-white sm:text-lg">{captions[phase] || ''}</p>
          <p className="mt-1 text-[11px] text-muted sm:text-xs">{subs[phase] || ''}</p>
        </div>

        {/* Skip */}
        <button
          onClick={onDone}
          className={`-mt-2 text-xs text-muted/40 underline underline-offset-2 transition-opacity duration-700 hover:text-muted/70 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          Skip intro
        </button>
      </div>
    </div>
  )
}
