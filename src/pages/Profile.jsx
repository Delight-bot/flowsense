import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Cpu,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  ChevronRight,
  Pill,
  Stethoscope,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { cycleHistory } from '../data/biomarkers.js'

const skus = ['Standard Formula', 'High-Magnesium', 'Anti-Inflammatory', 'Fertility Support']

export default function Profile() {
  const navigate = useNavigate()
  const { profile } = useApp()
  const [share, setShare] = useState(false)
  const [sku, setSku] = useState('Standard Formula')
  const [skuOpen, setSkuOpen] = useState(false)

  const remaining = 8 // of 10

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      {profile.name && <p className="mt-1 text-sm text-muted">{profile.name}</p>}

      {/* Reader module card */}
      <div className="mt-5 rounded-2xl bg-gradient-to-br from-card to-cardAlt p-5 shadow-glow ring-1 ring-orchid/40">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 animate-pulse rounded-full bg-success shadow-[0_0_8px_#4ADE80]" />
          <span className="font-bold">FlowSense Reader v1.0</span>
          <Cpu size={16} className="ml-auto text-blush" />
        </div>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <p className="text-xs text-muted">Connection</p>
            <p className="font-medium">NFC · Active</p>
          </div>
          <div>
            <p className="text-xs text-muted">Battery</p>
            <p className="font-medium text-success">94%</p>
          </div>
          <div>
            <p className="text-xs text-muted">Last sync</p>
            <p className="font-medium">Today 7:14 AM</p>
          </div>
          <div>
            <p className="text-xs text-muted">Total syncs</p>
            <p className="font-medium">47</p>
          </div>
          <div>
            <p className="text-xs text-muted">Strips used</p>
            <p className="font-medium">12</p>
          </div>
          <div>
            <p className="text-xs text-muted">Next pad due</p>
            <p className="font-medium text-gold">~2 days</p>
          </div>
        </div>
      </div>

      {/* Strip inventory */}
      <div className="mt-5 rounded-2xl bg-card p-5 shadow-glow">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Strip Inventory</h2>
          {remaining < 3 && <span className="text-xs font-semibold text-rose">Reorder in 6 days</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                i < remaining ? 'bg-orchid/40 shadow-glow' : 'bg-cardAlt'
              }`}
            >
              <Pill size={16} className={i < remaining ? 'text-blush' : 'text-muted/40'} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">{remaining} of 10 remaining</p>
      </div>

      {/* Hormone history */}
      <div className="mt-5 rounded-2xl bg-card p-5 shadow-glow">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">My Hormone History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="pb-2 font-medium">Cycle</th>
                <th className="pb-2 font-medium">E2 avg</th>
                <th className="pb-2 font-medium">P4 avg</th>
                <th className="pb-2 font-medium">Cortisol</th>
                <th className="pb-2 font-medium">Flags</th>
              </tr>
            </thead>
            <tbody>
              {cycleHistory.map((c) => (
                <tr key={c.cycle} className="border-t border-muted/15">
                  <td className="py-2 font-semibold">{c.cycle}</td>
                  <td className="py-2 text-gold">{c.e2}</td>
                  <td className="py-2 text-gold">{c.p4}</td>
                  <td className="py-2 text-gold">{c.cortisol}</td>
                  <td className="py-2 text-xs text-muted">{c.flags}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Physician sharing */}
      <div className="mt-5 rounded-2xl bg-card p-5 shadow-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Stethoscope size={18} className="mt-0.5 text-blush" />
            <div>
              <p className="text-sm font-semibold">Share report with my OB-GYN</p>
              <p className="text-xs text-muted">Monthly hormone report · HL7 FHIR compatible</p>
            </div>
          </div>
          <button
            onClick={() => setShare((s) => !s)}
            className={`relative h-7 w-12 flex-shrink-0 rounded-full transition ${
              share ? 'bg-success' : 'bg-cardAlt'
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                share ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Settings list */}
      <div className="mt-5 overflow-hidden rounded-2xl bg-card shadow-glow">
        {/* SKU selector */}
        <button
          onClick={() => setSkuOpen((o) => !o)}
          className="flex w-full items-center justify-between border-b border-muted/15 p-4 text-left text-sm"
        >
          <span className="flex items-center gap-3">
            <Pill size={18} className="text-blush" /> Personalized pad SKU
          </span>
          <span className="flex items-center gap-1 text-muted">
            {sku} <ChevronRight size={16} className={`transition-transform ${skuOpen ? 'rotate-90' : ''}`} />
          </span>
        </button>
        {skuOpen && (
          <div className="flex flex-wrap gap-2 border-b border-muted/15 bg-bg/40 p-4">
            {skus.map((s) => (
              <button
                key={s}
                onClick={() => { setSku(s); setSkuOpen(false) }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  sku === s ? 'bg-orchid text-white' : 'bg-cardAlt text-muted hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {[
          { Icon: Bell, label: 'Notification preferences', sub: 'Cycle reminders · anomaly alerts' },
          { Icon: Shield, label: 'Data privacy & HIPAA disclosure', sub: '' },
          { Icon: CreditCard, label: 'FlowSense Pro · $18/mo', sub: 'Next billing Dec 28' },
        ].map(({ Icon, label, sub }) => (
          <button
            key={label}
            className="flex w-full items-center justify-between border-b border-muted/15 p-4 text-left text-sm last:border-0"
          >
            <span className="flex items-center gap-3">
              <Icon size={18} className="text-blush" />
              <span>
                {label}
                {sub && <span className="block text-xs text-muted">{sub}</span>}
              </span>
            </span>
            <ChevronRight size={16} className="text-muted" />
          </button>
        ))}

        <button
          onClick={() => navigate('/')}
          className="flex w-full items-center gap-3 p-4 text-left text-sm font-semibold text-rose"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  )
}
