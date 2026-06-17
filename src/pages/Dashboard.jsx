import { useNavigate } from 'react-router-dom'
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Flame,
  Moon,
  Utensils,
  Pill,
  Sparkles,
  Database,
  Cpu,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import {
  biomarkers,
  statusColor,
  wickingLog,
  aiInsight,
} from '../data/biomarkers.js'
import Sparkline from '../components/Sparkline.jsx'
import CycleRing from '../components/CycleRing.jsx'

const TrendIcon = ({ trend }) => {
  if (trend > 0) return <TrendingUp size={14} className="text-rose" />
  if (trend < 0) return <TrendingDown size={14} className="text-blush" />
  return <Minus size={14} className="text-muted" />
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { profile, connected, logStreak, setLogStreak } = useApp()
  const name = profile.name || 'there'

  const quickLogs = [
    { Icon: Moon, label: 'Log sleep quality' },
    { Icon: Utensils, label: 'Log last meal' },
    { Icon: Pill, label: 'Medication taken' },
  ]

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-card to-cardAlt p-5 shadow-glow">
        <h1 className="text-xl font-bold">Good morning, {name}.</h1>
        <p className="mt-1 text-sm text-muted">
          Day 22 of your cycle. Luteal phase ends in 6 days.
        </p>
      </div>

      {/* Sensor status strip */}
      <div className="mt-4 rounded-2xl bg-card px-4 py-3 text-xs shadow-glow">
        {connected ? (
          <>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1.5 font-semibold text-success">
                <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
                Flow Pad™ · NFC Active
              </span>
              <span className="flex items-center gap-1 text-muted">
                <Cpu size={11} /> Serial: FS-2847
              </span>
              <span className="text-muted">Last sync: 7:14 AM</span>
              <span className="text-muted">Battery: 94%</span>
            </div>
            <p className="mt-1.5 text-[10px] text-muted/70">
              Wicking membrane saturated · 5-hormone panel reading in progress
            </p>
          </>
        ) : (
          <span className="flex items-center gap-1.5 font-semibold text-gold">
            <span className="h-2 w-2 rounded-full bg-gold" />
            Insert reader module to sync
          </span>
        )}
      </div>

      {/* Hormone snapshot */}
      <h2 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-muted">
        Hormone Snapshot
      </h2>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {biomarkers.map((b) => (
          <div
            key={b.key}
            className="min-w-[170px] flex-shrink-0 rounded-2xl bg-card p-4 shadow-glow"
          >
            <div className="flex items-center gap-2 text-xs text-muted">
              <Activity size={14} style={{ color: b.color }} />
              {b.name}
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gold">{b.value}</span>
              <span className="text-xs text-muted">{b.unit}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <TrendIcon trend={b.trend} />
              <span className="text-muted">
                {b.trend > 0 ? '+' : ''}
                {b.trend}% vs last cycle
              </span>
            </div>
            <span
              className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{ backgroundColor: `${statusColor[b.status]}22`, color: statusColor[b.status] }}
            >
              {b.status}
            </span>
            <div className="mt-2">
              <Sparkline data={b.spark} color={b.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Cycle phase ring */}
      <div className="mt-6 rounded-2xl bg-card p-5 shadow-glow">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">
          Cycle Phase
        </h2>
        <CycleRing activePhase="Luteal" />
        <p className="mt-3 text-center text-sm text-muted">
          Ovulation predicted: <span className="font-semibold text-blush">Day 6 next cycle</span>
        </p>
      </div>

      {/* Wicking activity log */}
      <div className="mt-6 rounded-2xl bg-card p-5 shadow-glow">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted">
          Wicking Activity Log
        </h2>
        <div className="relative ml-2 border-l border-muted/30 pl-5">
          {wickingLog.map((e, i) => (
            <div key={i} className="relative pb-5 last:pb-0">
              <span
                className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full ${
                  e.pending ? 'bg-muted/40' : e.flagged ? 'bg-rose' : 'bg-success'
                }`}
                style={!e.pending ? { boxShadow: `0 0 8px ${e.flagged ? '#D4418E' : '#4ADE80'}` } : {}}
              />
              <div className="flex items-center gap-2 text-sm font-semibold">
                {e.time && <span className="text-muted">{e.time}</span>}
                <span className={e.pending ? 'text-muted' : 'text-white'}>{e.label}</span>
              </div>
              {e.detail && (
                <p className={`mt-0.5 text-xs ${e.flagged ? 'text-rose' : 'text-muted'}`}>
                  {e.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI insight */}
      <div className="mt-6 rounded-2xl bg-card p-5 shadow-glow-gold ring-1 ring-gold/40">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <Sparkles size={16} className="text-gold" /> AI Insight
        </div>
        <p className="text-sm leading-relaxed text-white/90">{aiInsight.text}</p>
        <p className="mt-3 text-xs text-muted">{aiInsight.source}</p>
        <button
          onClick={() => navigate('/chat')}
          className="mt-4 rounded-xl bg-orchid/30 px-4 py-2 text-xs font-semibold text-blush transition hover:bg-orchid/50"
        >
          Ask OvaAI more →
        </button>
      </div>

      {/* Quick log */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Quick Log</h2>
          <span className="flex items-center gap-1 text-sm font-bold text-gold">
            <Flame size={16} className="text-rose" /> {logStreak}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickLogs.map(({ Icon, label }) => (
            <button
              key={label}
              onClick={() => setLogStreak((s) => s + 1)}
              className="flex items-center gap-2 rounded-full bg-cardAlt px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orchid/40"
            >
              <Icon size={16} className="text-blush" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Research Network card */}
      <div className="mt-6 mb-8 rounded-2xl bg-gradient-to-br from-orchid/20 to-card p-5 ring-1 ring-orchid/30">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <Database size={16} className="text-blush" /> Research Network
        </div>
        <p className="text-sm leading-relaxed text-white/90">
          Your anonymized cycle data contributes to the FlowSense Research Network — building the
          world's first longitudinal menstrual hormone dataset. Each cycle you contribute helps
          detect PCOS, endometriosis, and hormonal imbalance patterns earlier for every woman on the platform.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-bg/50 px-2 py-2.5">
            <p className="text-lg font-bold text-gold">3</p>
            <p className="text-[10px] leading-tight text-muted">Cycles contributed</p>
          </div>
          <div className="rounded-xl bg-bg/50 px-2 py-2.5">
            <p className="text-lg font-bold text-gold">47k+</p>
            <p className="text-[10px] leading-tight text-muted">Network members</p>
          </div>
          <div className="rounded-xl bg-bg/50 px-2 py-2.5">
            <p className="text-sm font-bold text-success">Opt-in</p>
            <p className="text-[10px] leading-tight text-muted">HIPAA safe</p>
          </div>
        </div>
      </div>
    </div>
  )
}
