import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Droplets, Cpu, Brain, ArrowRight, ChevronDown } from 'lucide-react'
import Orbs from '../components/Orbs.jsx'

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

  return (
    <div className="relative">
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
            FlowSense — the world's first biosensor feminine pad. Reads 5 hormones.
            Delivers 3 therapeutics. Talks to your doctor.
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
    </div>
  )
}
