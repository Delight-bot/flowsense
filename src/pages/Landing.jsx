import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Droplets, Cpu, Brain, ArrowRight, ChevronDown, FlaskConical, Users, Database } from 'lucide-react'
import Orbs from '../components/Orbs.jsx'
import IntroAnimation from '../components/IntroAnimation.jsx'

const researchCards = [
  {
    Icon: FlaskConical,
    title: 'Richer than a blood draw',
    body: 'Menstrual fluid is shed directly from the endometrium — the most hormonally active tissue in the body. Biomarker concentrations are up to 10× higher than venous blood, giving us signals no arm-draw can match.',
    color: '#F28AC4',
    stat: '10×',
    statLabel: 'richer in local biomarkers than serum',
  },
  {
    Icon: Users,
    title: 'Collection at population scale',
    body: '200 million women use menstrual pads every month. Flow turns that existing behaviour into the world\'s largest passive hormone monitoring network — no extra steps, no new habits, no barriers.',
    color: '#9B2D8E',
    stat: '200M',
    statLabel: 'monthly collection opportunities',
  },
  {
    Icon: Database,
    title: 'Flagging disease years earlier',
    body: 'Endometriosis takes 7–10 years to diagnose. PCOS is missed for an average of 2 years. Cycle-by-cycle hormone tracking from the source surfaces patterns months before symptoms force a clinic visit.',
    color: '#F5C842',
    stat: '7–10y',
    statLabel: 'average endometriosis diagnosis delay — today',
  },
]

const layers = [
  {
    Icon: Droplets,
    title: 'Wicking Membrane',
    body: 'Capillary action moves fluid from pad to sensor. No pump. No power. Same tech as COVID tests.',
    color: '#F28AC4',
  },
  {
    Icon: Cpu,
    title: 'Hybrid Sensor',
    body: 'Disposable electrochemical strip performs chemistry. Reusable optical reader measures color change. Electronics never touch fluid.',
    color: '#9B2D8E',
  },
  {
    Icon: Brain,
    title: 'AI Engine',
    body: '5 hormone readings. 3 cycles of data. PMOS and endometriosis risk scored before your next period.',
    color: '#F5C842',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const engRef = useRef(null)
  // Show intro once per browser session; re-plays if you open a new tab
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('fs_intro_shown'))

  const handleIntroDone = () => {
    sessionStorage.setItem('fs_intro_shown', '1')
    setShowIntro(false)
  }

  return (
    <div className="relative">
      {showIntro && <IntroAnimation onDone={handleIntroDone} />}

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Orbs />
        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-6 rounded-full bg-card/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-blush shadow-glow">
            FlowSense™ · Biosensor Platform
          </span>
          <h1 className="max-w-md text-4xl font-bold leading-tight">
            She already wears it.{' '}
            <span className="bg-gradient-to-r from-blush via-rose to-orchid bg-clip-text text-transparent">
              Now it works for her.
            </span>
          </h1>
          <p className="mt-5 max-w-sm text-base text-muted">
            Meet Flow, the world's first biosensor feminine pad. It monitors your
            hormones live, syncing a fresh reading whenever it collects a usable
            amount of fluid while you wear it. Reads 5 hormones. Delivers 3
            therapeutics. Talks to your doctor.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid px-8 py-4 text-base font-bold text-white shadow-glow-mint transition hover:scale-105"
          >
            Try the Demo <ArrowRight size={18} />
          </button>
          <button
            onClick={() => engRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6 flex flex-col items-center gap-1 text-sm text-muted transition hover:text-white"
          >
            How it Works
            <ChevronDown size={18} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* Engineering section */}
      <section ref={engRef} className="relative px-5 pb-20 pt-6">
        <h2 className="mb-2 text-center text-2xl font-bold">The system, in three layers</h2>
        <p className="mb-8 text-center text-sm text-muted">
          Lab-on-a-chip diagnostics, hidden inside a pad.
        </p>
        <div className="flex flex-col gap-4">
          {layers.map(({ Icon, title, body, color }) => (
            <div
              key={title}
              className="rounded-2xl bg-card p-5 shadow-glow"
              style={{ boxShadow: `0 0 24px ${color}22` }}
            >
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${color}22` }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/onboarding')}
          className="mx-auto mt-10 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid px-8 py-4 text-base font-bold text-white shadow-glow-mint transition hover:scale-105"
        >
          Try the Demo <ArrowRight size={18} />
        </button>
      </section>

      {/* Why the pad — research & science section */}
      <section className="relative px-5 pb-24 pt-6">
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-orchid/20 to-rose/10 p-5 text-center ring-1 ring-orchid/30">
          <p className="text-base font-bold leading-snug text-white">
            "200 million pads are used every month.
            <br />
            Every one is a hormone panel going in the trash."
          </p>
          <p className="mt-2 text-xs text-muted">The FlowSense thesis — going to the source</p>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold">Why the pad?</h2>
        <p className="mb-8 text-center text-sm text-muted">
          Menstrual fluid is uniquely rich in the biomarkers that matter. A larger collection base
          doesn't just help individual women — it accelerates research for all of them.
        </p>

        <div className="flex flex-col gap-4">
          {researchCards.map(({ Icon, title, body, color, stat, statLabel }) => (
            <div
              key={title}
              className="rounded-2xl bg-card p-5"
              style={{ boxShadow: `0 0 24px ${color}22` }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-bold" style={{ color }}>{stat}</span>
                  <span className="block text-[10px] leading-tight text-muted">{statLabel}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-card p-5 ring-1 ring-gold/30">
          <p className="text-sm font-bold text-gold mb-2">The research case</p>
          <p className="text-sm leading-relaxed text-white/90">
            Women's health has been chronically underfunded and understudied. Menstrual fluid —
            collected passively, every cycle, from hundreds of millions of women — is the largest
            untapped biomarker source in medicine. FlowSense doesn't just help each user understand
            her body. With opt-in anonymized data, every cycle contributed tightens the models that
            detect PCOS, endometriosis, hormonal imbalance, and metabolic risk for every woman who comes after.
          </p>
        </div>

        <button
          onClick={() => navigate('/onboarding')}
          className="mx-auto mt-10 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid px-8 py-4 text-base font-bold text-white shadow-glow-mint transition hover:scale-105"
        >
          Try the Demo <ArrowRight size={18} />
        </button>
      </section>
    </div>
  )
}
