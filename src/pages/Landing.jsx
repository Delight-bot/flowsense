import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Orbs from '../components/Orbs.jsx'
import IntroAnimation from '../components/IntroAnimation.jsx'
import { biomarkers, statusColor, aiInsight } from '../data/biomarkers.js'

// Short display names for the compact hormone grid
const shortName = {
  e2:       'Estradiol',
  p4:       'Progest.',
  lh:       'LH',
  cortisol: 'Cortisol',
  glucose:  'Glucose',
}

// ── Pad placeholder — swap for a real <img> when the photo is ready ───────
// Drop your image in /public/pad.jpg and replace this whole component with:
//   <img src="/pad.jpg" alt="Flow Pad" className="w-full object-contain" />
function PadVisual() {
  return (
    <svg viewBox="0 0 120 220" className="w-full drop-shadow-[0_0_24px_rgba(155,45,142,0.35)]" fill="none">
      {/* Body */}
      <rect x="16" y="6"   width="88" height="208" rx="38" fill="white" fillOpacity="0.93" />
      {/* Wings */}
      <rect x="0"   y="82" width="18" height="40"  rx="7"  fill="white" fillOpacity="0.7"  />
      <rect x="102" y="82" width="18" height="40"  rx="7"  fill="white" fillOpacity="0.7"  />
      {/* Inner zone */}
      <rect x="30" y="24" width="60" height="148" rx="20" fill="#F0EAF8" />
      {/* Center guide line */}
      <line x1="60" y1="32" x2="60" y2="158" stroke="#D8C4F0" strokeWidth="2" strokeDasharray="5 5" />
      {/* Sensor chip */}
      <rect x="24" y="156" width="72" height="44" rx="12" fill="#9B2D8E" />
      <rect x="32" y="164" width="56" height="28" rx="7"  fill="#7A1E7A" />
      <line x1="44" y1="164" x2="44" y2="192" stroke="#5A125A" strokeWidth="1.2" />
      <line x1="56" y1="164" x2="56" y2="192" stroke="#5A125A" strokeWidth="1.2" />
      <line x1="68" y1="164" x2="68" y2="192" stroke="#5A125A" strokeWidth="1.2" />
      <line x1="76" y1="164" x2="76" y2="192" stroke="#5A125A" strokeWidth="1.2" />
      <text x="60" y="182" textAnchor="middle" fontSize="9" fill="#F28AC4" fontWeight="700">NFC</text>
      {/* Brand */}
      <text x="60" y="96" textAnchor="middle" fontSize="8.5" fill="#9B2D8E" fontWeight="700" letterSpacing="0.8">FlowSense™</text>
      {/* Electrode dots */}
      <circle cx="42" cy="120" r="2.5" fill="#C4A7E7" fillOpacity="0.5" />
      <circle cx="60" cy="120" r="2.5" fill="#C4A7E7" fillOpacity="0.5" />
      <circle cx="78" cy="120" r="2.5" fill="#C4A7E7" fillOpacity="0.5" />
      {/* NFC rings below chip */}
      <circle cx="60" cy="212" r="11" stroke="#9B2D8E" strokeWidth="1"   strokeOpacity="0.4" fill="none" />
      <circle cx="60" cy="212" r="19" stroke="#9B2D8E" strokeWidth="0.8" strokeOpacity="0.22" fill="none" />
      <circle cx="60" cy="212" r="27" stroke="#9B2D8E" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
    </svg>
  )
}

export default function Landing() {
  const navigate   = useNavigate()
  const insightRef = useRef(null)
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('fs_intro_shown'))

  const handleIntroDone = () => {
    sessionStorage.setItem('fs_intro_shown', '1')
    setShowIntro(false)
  }

  return (
    <div className="relative">
      {showIntro && <IntroAnimation onDone={handleIntroDone} />}

      {/* ── Screen 1: Pad · Connection · Live Readings ───────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-10 pt-6 text-center">
        <Orbs />
        <div className="relative z-10 flex w-full max-w-xs flex-col items-center gap-5">

          {/* Connection status */}
          <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="font-medium text-white">Flow Pad™ · NFC Active</span>
            <span className="text-muted">7:14 AM</span>
          </div>

          {/* Pad image — 192 px wide, centered */}
          <div className="w-48">
            <PadVisual />
          </div>

          {/* Live hormone readings grid */}
          <div className="w-full rounded-2xl bg-card p-3">
            <p className="mb-2.5 text-[10px] uppercase tracking-widest text-muted">
              Detected this sync
            </p>
            <div className="grid grid-cols-5 gap-1">
              {biomarkers.map((b) => (
                <div key={b.key} className="flex flex-col items-center gap-1 rounded-xl bg-bg/70 py-2.5">
                  <span className="px-0.5 text-center text-[8px] leading-tight text-muted">
                    {shortName[b.key]}
                  </span>
                  <span className="text-sm font-bold leading-none text-gold">{b.value}</span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: statusColor[b.status] }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-white">
              She already wears it.
              <br />
              Now it works for her.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Flow reads 5 hormones passively from menstrual fluid — no blood draw,
              no appointment, no extra steps.
            </p>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('/onboarding')}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid px-8 py-4 text-base font-bold text-white transition hover:scale-105"
          >
            Try the Demo <ArrowRight size={18} />
          </button>

          {/* Scroll cue */}
          <button
            onClick={() => insightRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-xs text-muted transition hover:text-white"
          >
            What do these readings mean?
            <ChevronDown size={16} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Screen 2: Insights ──────────────────────────────────────────── */}
      <section ref={insightRef} className="px-5 pb-24 pt-10">

        <h2 className="text-2xl font-bold text-white">What your hormones mean</h2>
        <p className="mt-1 text-sm text-muted">Based on today's sync · Luteal phase · Day 22</p>

        {/* AI interpretation */}
        <div className="mt-5 rounded-2xl bg-card p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
            OvaAI analysis
          </p>
          <p className="text-sm leading-relaxed text-white">{aiInsight.text}</p>
        </div>

        {/* Why menstrual fluid */}
        <div className="mt-4 rounded-2xl bg-card p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Why the pad works
          </p>
          <p className="text-sm leading-relaxed text-white">
            Menstrual fluid is shed directly from the endometrium — hormone concentrations are
            up to 10× higher than in venous blood. Flow collects this passively while you wear it.
            Going to the source means earlier signals and richer data than any blood draw.
          </p>
        </div>

        {/* Research case */}
        <div className="mt-4 rounded-2xl bg-card p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
            The bigger picture
          </p>
          <p className="text-sm leading-relaxed text-white">
            200 million pads are used every month — every one is a hormone panel going in the trash.
            With opt-in anonymous data from our network, Flow helps detect PCOS and endometriosis
            patterns months before symptoms escalate to a clinic visit.
          </p>
        </div>

        <button
          onClick={() => navigate('/onboarding')}
          className="mx-auto mt-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid px-8 py-4 text-base font-bold text-white transition hover:scale-105"
        >
          Try the Demo <ArrowRight size={18} />
        </button>
      </section>
    </div>
  )
}
