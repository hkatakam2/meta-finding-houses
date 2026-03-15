import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', emoji: '🏠', label: 'Feed' },
  { to: '/discover', emoji: '🔍', label: 'Discover' },
  { to: '/neighborhood', emoji: '📍', label: 'Neighborhoods' },
  { to: '/homeboard', emoji: '📋', label: 'HomeBoard' },
]

export default function BottomNav() {
  const location = useLocation()

  // Only show on main screens
  const showOn = ['/', '/discover', '/neighborhood', '/homeboard']
  if (!showOn.includes(location.pathname)) return null

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 pb-2">
        {navItems.map(({ to, emoji, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-[11px] font-medium ${
                isActive ? 'text-primary' : 'text-text-secondary'
              }`
            }
          >
            <span className="text-lg leading-none">{emoji}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
