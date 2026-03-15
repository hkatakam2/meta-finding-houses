import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Route order for determining slide direction
const routeOrder = ['/', '/discover', '/neighborhood', '/homeboard']

function getRouteIndex(path: string) {
  const idx = routeOrder.indexOf(path)
  return idx === -1 ? routeOrder.length : idx
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navType = useNavigationType()
  const [slideClass, setSlideClass] = useState('')
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current === location.pathname) return

    if (navType === 'POP') {
      setSlideClass('slide-back')
    } else {
      const prevIdx = getRouteIndex(prevPath.current)
      const nextIdx = getRouteIndex(location.pathname)
      setSlideClass(nextIdx >= prevIdx ? 'slide-forward' : 'slide-back')
    }

    prevPath.current = location.pathname

    const timer = setTimeout(() => setSlideClass(''), 300)
    return () => clearTimeout(timer)
  }, [location.pathname, navType])

  return <div className={slideClass}>{children}</div>
}
