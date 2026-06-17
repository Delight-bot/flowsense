import { useEffect, useState } from 'react'

const ANIM_CSS = `
  @keyframes fs-drop-fall {
    0%   { transform: translateY(-120px) scale(0.65); opacity: 0; }
    55%  { opacity: 1; }
    78%  { transform: translateY(6px) scaleX(1.4) scaleY(0.5); }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }
  @keyframes fs-spread {
    0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0.85; }
    100% { transform: translate(-50%, -50%) scale(7); opacity: 0; }
  }
  @keyframes fs-ping-travel {
    0%   { left: 0;                   opacity: 0; }
    12%  { opacity: 1; }
    88%  { opacity: 1; }
    100% { left: calc(100% - 10px);   opacity: 0; }
  }
  .fs-drop-fall { animation: fs-drop-fall 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .fs-spread    { animation: fs-spread 1.5s ease-out forwards; }
  .fs-ping      { animation: fs-ping-travel 0.95s ease-in-out infinite; }
`

function PadGraphic({ glowing }) {
  const zone  = glowing ? '#d1fae5' : '#F0EAF8'
  const guide = glowing ? '#4ADE80' : '#D8C4F0'
  const chip  = glowing ? '#064e3b' : '#9B2D8E'
  const inner = glowing ? '#065f46' : '#7A1E7A'
  const trace = glowing ? '#34d399' : '#5A125A'
  const nfc   = glowing ? '#6ee7b7' : '#F28AC4'
  const brand = glowing ? '#059669' : '#9B2D8E'
  const dot   = glowing ? '#4ADE80' : '#C4A7E7'

  return (
    <div style={{
      filter: glowing
        ? 'drop-shadow(0 0 24px rgba(74,222,128,0.6))'
        : 'drop-shadow(0 0 18px rgba(155,45,142,0.4))',
      transition: 'filter 0.7s',
    }}>
      <svg viewBox="0 0 90 170" width="90" height="170" fill="none">
        <rect x="10" y="5"  width="70" height="160" rx="30" fill="white" fillOpacity="0.93" />
        <rect x="0"  y="62" width="13" height="32"  rx="6"  fill="white" fillOpacity="0.72" />
        <rect x="77" y="62" width="13" height="32"  rx="6"  fill="white" fillOpacity="0.72" />
        <rect x="22" y="20" width="46" height="112" rx="16" fill={zone}  style={{ transition: 'fill 0.8s' }} />
        <line x1="45" y1="26" x2="45" y2="120"
          stroke={guide} strokeWidth="1.5" strokeDasharray="4 4"
          style={{ transition: 'stroke 0.8s' }} />
        <rect x="18" y="118" width="54" height="36" rx="9"  fill={chip}  style={{ transition: 'fill 0.8s' }} />
        <rect x="24" y="124" width="42" height="24" rx="5"  fill={inner} style={{ transition: 'fill 0.8s' }} />
        <line x1="33" y1="124" x2="33" y2="148" stroke={trace} strokeWidth="0.9" />
        <line x1="42" y1="124" x2="42" y2="148" stroke={trace} strokeWidth="0.9" />
        <line x1="51" y1="124" x2="51" y2="148" stroke={trace} strokeWidth="0.9" />
        <line x1="57" y1="124" x2="57" y2="148" stroke={trace} strokeWidth="0.9" />
        <text x="45" y="139" textAnchor="middle" fontSize="7"   fill={nfc}   fontWeight="700">NFC</text>
        <text x="45" y="74"  textAnchor="middle" fontSize="6.5" fill={brand} fontWeight="700" letterSpacing="0.6">FlowSense™</text>
        <circle cx="30" cy="90" r="2" fill={dot} fillOpacity={glowing ? '0.95' : '0.5'} />
        <circle cx="45" cy="90" r="2" fill={dot} fillOpacity={glowing ? '0.95' : '0.5'} />
        <circle cx="60" cy="90" r="2" fill={dot} fillOpacity={glowing ? '0.95' : '0.5'} />
      </svg>
    </div>
  )
}

function PhoneGraphic({ lit }) {
  return (
    <div style={{
      filter: lit ? 'drop-shadow(0 0 16px rgba(155,45,142,0.55))' : 'none',
      transition: 'filter 0.6s',
    }}>
      <svg viewBox="0 0 72 132" width="72" height="132" fill="none">
        <rect x="2" y="2" width="68" height="128" rx="15"
          fill="#1C1C1E"
          stroke={lit ? '#9B2D8E' : '#3A3A3C'}
          strokeWidth={lit ? '2.5' : '1.8'}
        />
        <rect x="6" y="10" width="60" height="106" rx="11" fill="#1A0A2E" />
        <rect x="23" y="13" width="26" height="9" rx="4" fill="black" />
        {lit && (
          <>
            <rect x="10" y="28" width="52" height="7"  rx="3" fill="#2D1545" />
            <rect x="10" y="39" width="30" height="4"  rx="2" fill="#9B2D8E" fillOpacity="0.55" />
            <rect x="10" y="48" width="23" height="20" rx="3" fill="#2D1545" />
            <rect x="37" y="48" width="23" height="20" rx="3" fill="#2D1545" />
            <rect x="10" y="72" width="23" height="20" rx="3" fill="#2D1545" />
            <rect x="37" y="72" width="23" height="20" rx="3" fill="#2D1545" />
            <text x="21.5" y="62" textAnchor="middle" fontSize="6" fill="#F5C842" fontWeight="700">142</text>
            <text x="48.5" y="62" textAnchor="middle" fontSize="6" fill="#F5C842" fontWeight="700">8.4</text>
            <text x="21.5" y="86" textAnchor="middle" fontSize="6" fill="#F5C842" fontWeight="700">6.2</text>
            <text x="48.5" y="86" textAnchor="middle" fontSize="6" fill="#D4418E" fontWeight="700">18.6↑</text>
            <rect x="6"  y="100" width="60" height="14" rx="6"   fill="#2D1545" />
            <circle cx="21" cy="107" r="3.5" fill="#9B2D8E" />
            <circle cx="36" cy="107" r="3"   fill="#3A1C58" />
            <circle cx="51" cy="107" r="3"   fill="#3A1C58" />
          </>
        )}
        <rect x="25" y="119" width="22" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
      </svg>
    </div>
  )
}

export default function IntroAnimation({ onDone }) {
  const [phase, setPhase] = useState(0)
  // 0 → black
  // 1 → pad fades in
  // 2 → green drop falls onto pad
  // 3 → pad glows + spread rings from impact
  // 4 → NFC signals travel + phone slides in
  // 5 → phone lights up with app
  // 6 → fade out → landing

  useEffect(() => {
    const schedule = [
      [400,  1],
      [1100, 2],
      [1950, 3],
      [3200, 4],
      [4050, 5],
      [5400, 6],
    ]
    const timers = schedule.map(([ms, p]) => setTimeout(() => setPhase(p), ms))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase === 6) {
      const t = setTimeout(onDone, 650)
      return () => clearTimeout(t)
    }
  }, [phase, onDone])

  const captions = [
    '',
    'Meet the Flow Pad™',
    'Sample collected.',
    'Analyzing 5 hormones...',
    'Syncing via NFC...',
    'Connected. Your hormones, live.',
    '',
  ]
  const subs = [
    '',
    'The world\'s first biosensor feminine pad',
    'Fluid captured by the microfluidic sensor strip',
    'Electrochemical biosensor reading in progress',
    'Transferring your full hormone panel in real time',
    'Real-time hormone intelligence, delivered to your phone',
    '',
  ]

  return (
    <>
      <style>{ANIM_CSS}</style>
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
          phase >= 6 ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute left-1/4 top-1/3 h-72 w-72 rounded-full blur-3xl transition-all duration-1000 ${
              phase >= 3 ? 'bg-green-500/15' : 'bg-orchid/15'
            } ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            className={`absolute right-1/4 top-1/3 h-56 w-56 rounded-full bg-rose/10 blur-3xl transition-opacity duration-1000 ${
              phase >= 4 ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="flex items-center gap-5 sm:gap-10">

            {/* Pad + drop + spread */}
            <div className={`relative transition-opacity duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <PadGraphic glowing={phase >= 3} />

              {/* Green biosensor drop — falls from above center of pad */}
              {phase >= 2 && (
                <div
                  className="fs-drop-fall pointer-events-none absolute"
                  style={{ top: '30%', left: 'calc(50% - 12px)' }}
                >
                  <svg viewBox="-14 -26 28 48" width="24" height="42" fill="none">
                    <path
                      d="M 0 -22 C -10 -9, -12 2, -12 9 C -12 18, -6 22, 0 22 C 6 22, 12 18, 12 9 C 12 2, 10 -9, 0 -22 Z"
                      fill="#4ADE80" fillOpacity="0.93"
                    />
                    <ellipse cx="-3.5" cy="3" rx="3.8" ry="6.5" fill="white" fillOpacity="0.25" />
                  </svg>
                </div>
              )}

              {/* Spread rings from impact point */}
              {phase >= 3 && [0, 0.32, 0.68].map((delay, i) => (
                <div
                  key={i}
                  className="fs-spread pointer-events-none absolute rounded-full border-2 border-green-400"
                  style={{
                    left: '50%',
                    top: '41%',
                    width: '38px',
                    height: '18px',
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>

            {/* NFC signal line with travelling pings */}
            <div className={`transition-opacity duration-500 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col items-center gap-1.5">
                <div className="relative flex items-center" style={{ width: '56px' }}>
                  <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-green-400 to-blush" />
                  {phase >= 4 && [0, 0.32, 0.64].map((delay, i) => (
                    <div
                      key={i}
                      className="fs-ping pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-green-400"
                      style={{
                        top: '50%',
                        transform: 'translateY(-50%)',
                        animationDelay: `${delay}s`,
                      }}
                    />
                  ))}
                  <div
                    className="absolute"
                    style={{
                      right: '-7px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '8px solid #F28AC4',
                    }}
                  />
                </div>
                <span className="text-[9px] font-semibold tracking-wide text-muted/70">NFC · 13.56 MHz</span>
              </div>
            </div>

            {/* Phone */}
            <div
              className={`transition-all duration-700 ${
                phase >= 4 ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
              }`}
            >
              <PhoneGraphic lit={phase >= 5} />
            </div>
          </div>

          {/* Caption */}
          <div className={`text-center transition-all duration-500 ${phase >= 1 && phase < 6 ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-base font-bold text-white sm:text-lg">{captions[phase] || ''}</p>
            <p className="mt-1 text-[11px] text-muted sm:text-xs">{subs[phase] || ''}</p>
          </div>

          {/* Skip */}
          <button
            onClick={onDone}
            className={`-mt-2 text-xs text-muted/40 underline underline-offset-2 transition-opacity duration-700 hover:text-muted/70 ${
              phase >= 1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Skip intro
          </button>
        </div>
      </div>
    </>
  )
}
