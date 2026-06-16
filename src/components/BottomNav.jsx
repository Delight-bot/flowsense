import { NavLink } from 'react-router-dom'
import { Home, Activity, MessageCircle, User, Map } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Home', Icon: Home },
  { to: '/wicking', label: 'Wicking', Icon: Activity },
  { to: '/chat', label: 'AI Chat', Icon: MessageCircle },
  { to: '/bodymap', label: 'Body Map', Icon: Map },
  { to: '/profile', label: 'Profile', Icon: User },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 lg:max-w-2xl">
      <div className="mx-3 mb-3 flex items-center justify-between rounded-2xl bg-card/90 px-2 py-2 shadow-glow backdrop-blur-lg">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[11px] transition ${
                isActive ? 'text-blush' : 'text-muted hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  className={isActive ? 'drop-shadow-[0_0_8px_rgba(242,138,196,0.8)]' : ''}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
