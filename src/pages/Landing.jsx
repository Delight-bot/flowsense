import { useRef, useState } from 'react'
import padImg from '../assets/pad.png'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Orbs from '../components/Orbs.jsx'
import IntroAnimation from '../components/IntroAnimation.jsx'
import { aiInsight } from '../data/biomarkers.js'

// Pad visual. To use a real photo once you have one:
// 1. Drop the image in /public/pad.jpg
// 2. Replace <PadVisual /> with:
//    <img src="/pad.jpg" alt="Flow Pad" className="w-full object-contain" />
function PadVisual() {
  const ledCols = [37, 49, 60, 71, 83]
  return (
    <svg viewBox="0 0 120 224" className="w-full drop-shadow-[0_0_28px_rgba(155,45,142,0.4)]" fill="none">

      {/* Pad body and wings */}
      <rect x="16" y="6" width="88" height="212" rx="38" fill="white" fillOpacity="0.94" />
      <rect x="0"   y="83" width="17" height="38" rx="7" fill="white" fillOpacity="0.72" />
      <rect x="103" y="83" width="17" height="38" rx="7" fill="white" fillOpacity="0.72" />

      {/* Inner absorbent zone */}
      <rect x="28" y="22" width="64" height="128" rx="18" fill="#EDE4F8" />

      {/* Brand */}
      <text x="60" y="36" textAnchor="middle" fontSize="7" fill="#9B2D8E" fontWeight="700" letterSpacing="1">FlowSense™</text>

      {/* Sensor electrode array: 5 columns x 2 rows */}
      {ledCols.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="52" r="2.2" fill="#9B2D8E" fillOpacity="0.2" />
          <circle cx={cx} cy="66" r="2.2" fill="#9B2D8E" fillOpacity="0.2" />
        </g>
      ))}

      {/* ECG waveform (active read line) */}
      <path
        d="M 30 98 L 44 98 L 48 83 L 53 113 L 58 83 L 62 98 L 90 98"
        stroke="#9B2D8E" strokeWidth="1.6" strokeOpacity="0.35"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Circuit traces from electrode array to chip */}
      {ledCols.map((x) => (
        <line key={x} x1={x} y1="74" x2={x} y2="150"
          stroke="#9B2D8E" strokeWidth="0.7" strokeOpacity="0.15" />
      ))}

      {/* PCB chip substrate */}
      <rect x="20" y="150" width="80" height="66" rx="14" fill="#0D0820" />
      <rect x="20" y="150" width="80" height="66" rx="14"
        stroke="#9B2D8E" strokeWidth="0.8" strokeOpacity="0.55" />

      {/* PCB rails */}
      <line x1="24" y1="160" x2="96" y2="160" stroke="#9B2D8E" strokeWidth="0.5" strokeOpacity="0.28" />
      <line x1="24" y1="206" x2="96" y2="206" stroke="#9B2D8E" strokeWidth="0.5" strokeOpacity="0.28" />

      {/* IC package */}
      <rect x="29" y="162" width="62" height="26" rx="5" fill="#1A0A2E" />
      <rect x="29" y="162" width="62" height="26" rx="5"
        stroke="#9B2D8E" strokeWidth="0.5" strokeOpacity="0.35" />

      {/* 5 hormone LEDs: glow halo then dot */}
      {[
        { cx: 39,  color: '#4ADE80' },
        { cx: 50,  color: '#F5C842' },
        { cx: 60,  color: '#F28AC4' },
        { cx: 70,  color: '#D4418E' },
        { cx: 81,  color: '#9B2D8E' },
      ].map(({ cx, color }) => (
        <g key={cx}>
          <circle cx={cx} cy="175" r="5.5" fill={color} fillOpacity="0.18" />
          <circle cx={cx} cy="175" r="3"   fill={color} />
        </g>
      ))}

      {/* Hormone labels */}
      {[
        { cx: 39, label: 'E2'  },
        { cx: 50, label: 'P4'  },
        { cx: 60, label: 'LH'  },
        { cx: 70, label: 'COR' },
        { cx: 81, label: 'GLU' },
      ].map(({ cx, label }) => (
        <text key={cx} x={cx} y="184" textAnchor="middle" fontSize="4.5" fill="#C4A7E7">{label}</text>
      ))}

      {/* NFC label (left of chip) */}
      <text x="43" y="198" textAnchor="middle" fontSize="5" fill="#C4A7E7" letterSpacing="0.3">NFC · 13.56 MHz</text>

      {/* Active status dot (right of chip) */}
      <circle cx="86" cy="196" r="4.5" fill="#4ADE80" fillOpacity="0.18" />
      <circle cx="86" cy="196" r="2.5" fill="#4ADE80" />
      <text    x="86" y="207" textAnchor="middle" fontSize="4" fill="#4ADE80" letterSpacing="0.4">LIVE</text>
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

          {/* Pad image */}
          <div className="w-52">
            <img
              src={padImg}
              alt="Flow Pad biosensor"
              className="w-full object-contain drop-shadow-[0_0_28px_rgba(155,45,142,0.45)]"
            />
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-white">
              She already wears it.
              <br />
              Now it works for her.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Flow reads 5 hormones passively from menstrual fluid. No blood draw,
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
            Menstrual fluid is shed directly from the endometrium. Hormone concentrations are
            up to 10x higher than in venous blood. Flow collects this passively while you wear it.
            Going to the source means earlier signals and richer data than any blood draw.
          </p>
        </div>

        {/* Research case */}
        <div className="mt-4 rounded-2xl bg-card p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
            The bigger picture
          </p>
          <p className="text-sm leading-relaxed text-white">
            200 million pads are used every month. Every one is a hormone panel going in the trash.
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
