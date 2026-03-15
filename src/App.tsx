import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Placeholder title="Discover" />} />
        <Route path="/search" element={<Placeholder title="Search" />} />
        <Route path="/saved" element={<Placeholder title="Saved" />} />
        <Route path="/messages" element={<Placeholder title="Messages" />} />
        <Route path="/profile" element={<Placeholder title="Profile" />} />
      </Routes>
      <BottomNav />
    </>
  )
}
