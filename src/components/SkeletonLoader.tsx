import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

function SkeletonScreen() {
  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header skeleton */}
      <div className="bg-card px-4 pt-12 pb-3 border-b border-border flex items-center gap-3">
        <div className="skeleton w-9 h-9 rounded-full" />
        <div className="skeleton h-5 w-36 rounded-full" />
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Card skeleton */}
        <div className="bg-card rounded-2xl p-4 border border-border space-y-3">
          <div className="skeleton h-40 w-full rounded-xl" />
          <div className="skeleton h-5 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-4 w-2/3" />
        </div>

        {/* Second card skeleton */}
        <div className="bg-card rounded-2xl p-4 border border-border space-y-3">
          <div className="skeleton h-32 w-full rounded-xl" />
          <div className="skeleton h-5 w-2/3" />
          <div className="skeleton h-4 w-1/2" />
        </div>

        {/* Third card skeleton */}
        <div className="bg-card rounded-2xl p-4 border border-border space-y-3">
          <div className="skeleton h-24 w-full rounded-xl" />
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-4 w-1/3" />
        </div>
      </div>
    </div>
  )
}

export default function SkeletonLoader({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname
      setLoading(true)
      const timer = setTimeout(() => setLoading(false), 400)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  if (loading) return <SkeletonScreen />
  return <>{children}</>
}
