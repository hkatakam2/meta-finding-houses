import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import PageTransition from './components/PageTransition'
import SkeletonLoader from './components/SkeletonLoader'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Neighborhood from './pages/Neighborhood'
import HomeBoard from './pages/HomeBoard'

function Placeholder({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center pb-20">
      <p className="text-text-secondary text-lg">{title}</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <PageTransition>
        <SkeletonLoader>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/neighborhood" element={<Neighborhood />} />
            <Route path="/homeboard" element={<HomeBoard />} />
            <Route path="/search" element={<Placeholder title="Search" />} />
            <Route path="/saved" element={<Placeholder title="Saved" />} />
            <Route path="/messages" element={<Placeholder title="Messages" />} />
            <Route path="/profile" element={<Placeholder title="Profile" />} />
          </Routes>
        </SkeletonLoader>
      </PageTransition>
      <BottomNav />
    </>
  )
}
