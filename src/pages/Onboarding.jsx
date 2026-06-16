import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowLeft,
  Microscope,
  Sprout,
  Baby,
  HeartPulse,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { symptomOptions } from '../data/biomarkers.js'
import WickingDiagram from '../components/WickingDiagram.jsx'
import Orbs from '../components/Orbs.jsx'

const ageRanges = ['<18', '18–24', '25–34', '35–44', '45+']
const regularity = ['Regular', 'Irregular', 'Unknown / Just started tracking']
const goals = [
  { id: 'understand', Icon: Microscope, title: 'Understand my hormones', body: 'Get a monthly hormone panel without a blood draw' },
  { id: 'reduce', Icon: Sprout, title: 'Reduce symptoms', body: 'Cramp relief, skin improvement, energy support' },
  { id: 'fertility', Icon: Baby, title: 'Fertility support', body: 'Ovulation detection and cycle optimization' },
  { id: 'prevent', Icon: HeartPulse, title: 'Prevent disease', body: 'Early PMOS and endometriosis detection' },
]

const Chip = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
      active
        ? 'bg-orchid text-white shadow-glow ring-2 ring-blush'
        : 'bg-cardAlt text-muted hover:text-white'
    }`}
  >
    {children}
  </button>
)

export default function Onboarding() {
  const navigate = useNavigate()
  const { profile, updateProfile, toggleSymptom, toggleGoal, setConnected } = useApp()
  const [step, setStep] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [done, setDone] = useState(false)

  const progress = step * 25

  const finish = () => {
    setConnected(true)
    navigate('/dashboard')
  }

  return (
    <div className="relative min-h-screen px-5 pb-10 pt-8">
      <Orbs />
      <div className="relative z-10">
        {/* progress bar */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-muted">
            <span>Step {step} of 4</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-cardAlt">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose to-orchid transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Welcome to FlowSense</h2>
            <div>
              <label className="mb-2 block text-sm text-muted">What's your name?</label>
              <input
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-xl bg-cardAlt px-4 py-3 text-white placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orchid"
              />
            </div>
            <div>
              <p className="mb-3 text-sm text-muted">Age range</p>
              <div className="flex flex-wrap gap-2">
                {ageRanges.map((a) => (
                  <Chip key={a} active={profile.ageRange === a} onClick={() => updateProfile({ ageRange: a })}>
                    {a}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm text-muted">Cycle regularity</p>
              <div className="flex flex-wrap gap-2">
                {regularity.map((r) => (
                  <Chip key={r} active={profile.cycleRegularity === r} onClick={() => updateProfile({ cycleRegularity: r })}>
                    {r}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold">What are you experiencing?</h2>
            <p className="mt-1 text-sm text-muted">Tap any that apply.</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {symptomOptions.map((s) => {
                const active = profile.symptoms.includes(s)
                return (
                  <button
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                      active
                        ? 'bg-orchid/40 text-white ring-2 ring-blush'
                        : 'bg-cardAlt text-muted hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold">What's your goal?</h2>
            <p className="mt-1 text-sm text-muted">Pick everything that fits.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {goals.map(({ id, Icon, title, body }) => {
                const active = profile.goals.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => toggleGoal(id)}
                    className={`flex flex-col rounded-2xl p-4 text-left transition ${
                      active
                        ? 'bg-orchid/40 ring-2 ring-blush shadow-glow'
                        : 'bg-card hover:bg-cardAlt'
                    }`}
                  >
                    <Icon size={26} className="mb-2 text-blush" />
                    <span className="text-sm font-bold leading-tight">{title}</span>
                    <span className="mt-1 text-xs text-muted">{body}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center">
            <h2 className="mb-1 text-2xl font-bold">Sensor Setup</h2>
            <p className="mb-6 text-center text-sm text-muted">
              Watch the microfluidic wicking process in action.
            </p>
            <WickingDiagram playing={playing} onComplete={() => setDone(true)} />

            <div className="mt-8 flex w-full flex-col gap-3">
              {!done ? (
                <>
                  <button
                    onClick={() => setPlaying(true)}
                    disabled={playing}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid px-6 py-4 text-base font-bold text-white shadow-glow-mint transition hover:scale-[1.02] disabled:opacity-60"
                  >
                    {playing ? 'Connecting…' : 'Connect My FlowSense'}
                  </button>
                  <button
                    onClick={finish}
                    className="rounded-2xl border border-muted/40 px-6 py-4 text-base font-semibold text-muted transition hover:text-white"
                  >
                    Demo Mode (skip to dashboard)
                  </button>
                </>
              ) : (
                <button
                  onClick={finish}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-success to-orchid px-6 py-4 text-base font-bold text-white shadow-glow-mint transition hover:scale-[1.02]"
                >
                  Enter Dashboard <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* nav buttons (steps 1-3) */}
        {step < 4 && (
          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1 text-sm text-muted transition hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <span />
            )}
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose to-orchid px-7 py-3 text-sm font-bold text-white shadow-glow-mint transition hover:scale-105"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
