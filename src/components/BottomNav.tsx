import { Home, Search, Heart, MessageCircle, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/saved', icon: Heart, label: 'Saved' },
  { to: '/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 pb-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-xs ${
                isActive ? 'text-primary' : 'text-text-secondary'
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
