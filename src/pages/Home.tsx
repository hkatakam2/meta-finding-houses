import { Home as HomeIcon, ShoppingBag, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function PostPlaceholder({ lines = 3 }: { lines?: number }) {
  return (
    <div className="bg-card border-b border-border py-3 px-4">
      {/* Post header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-border" />
        <div className="flex-1">
          <div className="h-3.5 w-28 bg-border rounded-full" />
          <div className="h-2.5 w-16 bg-border rounded-full mt-1.5" />
        </div>
      </div>
      {/* Post text lines */}
      <div className="space-y-2 mb-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-border rounded-full"
            style={{ width: i === lines - 1 ? '60%' : '100%' }}
          />
        ))}
      </div>
      {/* Post image placeholder */}
      <div className="h-48 bg-border rounded-lg" />
      {/* Post actions */}
      <div className="flex justify-around mt-3 pt-2 border-t border-border">
        <div className="h-3 w-12 bg-border rounded-full" />
        <div className="h-3 w-12 bg-border rounded-full" />
        <div className="h-3 w-12 bg-border rounded-full" />
      </div>
    </div>
  )
}

function DiscoveryCard({ onClick }: { onClick: () => void }) {
  return (
    <div className="bg-card border-b border-border py-3 px-4">
      <p className="text-xs text-text-secondary font-semibold mb-2 tracking-wide uppercase">
        Suggested for you
      </p>
      <button
        onClick={onClick}
        className="w-full text-left rounded-xl overflow-hidden shadow-md border border-border bg-card active:scale-[0.98] transition-transform"
      >
        {/* Hero image */}
        <div
          className="h-44 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1877F2 0%, #31A24C 100%)',
          }}
        >
          <span className="text-6xl">🏠</span>
        </div>
        {/* Card body */}
        <div className="p-4">
          <h3 className="text-base font-bold text-text leading-snug">
            Homes in your price range near you
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            12 new listings this week
          </p>
          <div className="mt-3 bg-primary text-white text-sm font-semibold rounded-lg py-2.5 text-center">
            Explore Homes
          </div>
        </div>
      </button>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Facebook-style top nav */}
      <header className="bg-card px-4 pt-12 pb-2 border-b border-border flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">facebook</h1>
        <div className="flex items-center gap-4">
          <HomeIcon size={22} className="text-primary" />
          <ShoppingBag size={22} className="text-text-secondary" />
          <Bell size={22} className="text-text-secondary" />
        </div>
      </header>

      {/* Feed */}
      <div>
        <PostPlaceholder lines={2} />
        <DiscoveryCard onClick={() => navigate('/discover')} />
        <PostPlaceholder lines={3} />
        <PostPlaceholder lines={2} />
      </div>
    </div>
  )
}
