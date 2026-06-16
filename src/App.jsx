import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Wicking from './pages/Wicking.jsx'
import Chat from './pages/Chat.jsx'
import BodyMap from './pages/BodyMap.jsx'
import Profile from './pages/Profile.jsx'
import BottomNav from './components/BottomNav.jsx'

export default function App() {
  const { pathname } = useLocation()
  const showNav = ['/dashboard', '/wicking', '/chat', '/bodymap', '/profile'].includes(
    pathname
  )

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="mx-auto min-h-screen w-full max-w-md bg-bg sm:max-w-md lg:max-w-2xl">
        <div className={showNav ? 'pb-24' : ''}>
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
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
