import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Wicking from './pages/Wicking.jsx'
import Chat from './pages/Chat.jsx'
import BodyMap from './pages/BodyMap.jsx'
import Profile from './pages/Profile.jsx'
import BottomNav from './components/BottomNav.jsx'

// When this returns true the phone shell gets a CSS transform, which makes
// every position:fixed child (BottomNav, BodyMap drawer, etc.) position
// relative to the shell instead of the viewport — keeping them inside the bezel.
function useIsDesktop() {
  const [is, setIs] = useState(() => window.innerWidth >= 1024)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e) => setIs(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return is
}

export default function App() {
  const { pathname } = useLocation()
  const isDesktop = useIsDesktop()
  const showNav = ['/dashboard', '/wicking', '/chat', '/bodymap', '/profile'].includes(pathname)

  return (
    // Full page: deep black on desktop to contrast with the phone bezel
    <div className="min-h-screen bg-bg text-white lg:flex lg:items-center lg:justify-center lg:bg-black lg:py-8">

      {/* ── Phone shell ──────────────────────────────────────────────────────
          Mobile : plain full-screen container (no frame)
          Desktop: iPhone-shaped bezel, 393 × 852 px
          The JS-conditional transform creates a new containing block so that
          position:fixed children (BottomNav, drawers) anchor to the bezel, not
          the viewport. ──────────────────────────────────────────────────── */}
      <div
        className="relative min-h-screen w-full bg-bg
          lg:min-h-0 lg:h-[852px] lg:w-[393px] lg:overflow-hidden
          lg:rounded-[52px] lg:border-[14px] lg:border-[#1C1C1E]
          lg:shadow-[0_0_0_2px_#3A3A3C,0_60px_120px_rgba(0,0,0,0.95)]"
        style={isDesktop ? { transform: 'translate3d(0,0,0)' } : undefined}
      >
        {/* Dynamic Island — desktop only */}
        <div className="pointer-events-none absolute left-1/2 top-[10px] z-[200] hidden h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black lg:block" />

        {/* Left side buttons (volume) — desktop only, decorative */}
        <div className="pointer-events-none absolute -left-[3px] top-28 z-[200] hidden lg:flex lg:flex-col lg:gap-3">
          <div className="h-8 w-[3px] rounded-r-full bg-[#3A3A3C]" />
          <div className="mt-2 h-14 w-[3px] rounded-r-full bg-[#3A3A3C]" />
          <div className="mt-2 h-14 w-[3px] rounded-r-full bg-[#3A3A3C]" />
        </div>

        {/* Right side button (power) — desktop only, decorative */}
        <div className="pointer-events-none absolute -right-[3px] top-36 z-[200] hidden lg:block">
          <div className="h-20 w-[3px] rounded-l-full bg-[#3A3A3C]" />
        </div>

        {/* ── Scrollable screen area ── */}
        <div
          className={`min-h-screen
            lg:min-h-0 lg:h-full lg:overflow-y-auto lg:pt-12
            [&::-webkit-scrollbar]:hidden [scrollbar-width:none]
            ${showNav ? 'pb-24' : ''}`}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wicking" element={<Wicking />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/bodymap" element={<BodyMap />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* BottomNav: fixed to phone shell on desktop, viewport on mobile */}
        {showNav && <BottomNav />}

        {/* Home indicator — desktop only */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-[200] hidden h-1 w-32 -translate-x-1/2 rounded-full bg-white/20 lg:block" />
      </div>
    </div>
  )
}
