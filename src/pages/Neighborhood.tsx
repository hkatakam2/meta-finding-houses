import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, MessageCircle, X, Send } from 'lucide-react'

function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" stroke="#E4E6EB" strokeWidth="6" />
          <circle
            cx="48" cy="48" r="42" fill="none"
            stroke="#31A24C" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 264} 264`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-accent-green">{score}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-accent-green mt-1">Neighborhood Match</span>
    </div>
  )
}

function StatPill({ text }: { text: string }) {
  return (
    <span className="bg-white border border-border rounded-full px-3 py-1.5 text-xs font-medium text-text whitespace-nowrap">
      {text}
    </span>
  )
}

function MessengerModal({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ text: string; fromMe: boolean }[]>([
    { text: "Hey! I saw you're looking at places in Willow Creek. Happy to answer any questions!", fromMe: false },
  ])

  const sendMessage = () => {
    if (!message.trim()) return
    setMessages(prev => [...prev, { text: message.trim(), fromMe: true }])
    setMessage('')
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "That's a great question! Let me think about that and get back to you 😊", fromMe: false }])
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[390px] bg-card rounded-t-2xl flex flex-col"
        style={{ height: '70dvh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            M
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text">Maya Chen</p>
            <p className="text-xs text-accent-green">Active now</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-hover">
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.fromMe
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-border text-text rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-2.5 border-t border-border flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-border rounded-full px-4 py-2 text-sm text-text outline-none placeholder:text-text-secondary"
          />
          <button
            onClick={sendMessage}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center active:scale-95 transition-transform"
          >
            <Send size={16} className="text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Neighborhood() {
  const navigate = useNavigate()
  const [showMessenger, setShowMessenger] = useState(false)

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Top bar */}
      <header className="bg-card px-4 pt-12 pb-3 border-b border-border flex items-center gap-3">
        <button
          onClick={() => navigate('/discover')}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-hover active:bg-hover"
        >
          <ArrowLeft size={22} className="text-text" />
        </button>
        <h1 className="text-lg font-semibold text-text">Willow Creek</h1>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Hero section */}
        <div className="bg-card rounded-2xl p-5 border border-border text-center">
          <h2 className="text-2xl font-bold text-text">Willow Creek</h2>
          <p className="text-sm text-text-secondary mt-1">Austin, TX · Family-Friendly Neighborhood</p>

          <div className="mt-5 flex justify-center">
            <ScoreBadge score={87} />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <StatPill text="🏫 A-rated schools" />
            <StatPill text="🚶 Walkability 92" />
            <StatPill text="🌳 Parks nearby 5" />
            <StatPill text="🔒 Safety: Low crime" />
          </div>
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl p-4 border border-purple-200" style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe, #f0f4ff)' }}>
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles size={18} className="text-purple-500" />
            <span className="text-sm font-semibold text-purple-700">AI Neighborhood Summary</span>
          </div>
          <p className="text-sm leading-relaxed text-text">
            Residents describe Willow Creek as a tight-knit, family-oriented community with low traffic,
            well-maintained sidewalks, and a beloved Saturday farmers market. Recent Group discussions
            mention a new playground being built at the community park.
          </p>
          <p className="text-xs text-text-secondary mt-3">
            Sources: 47 resident reviews, 12 Facebook Groups
          </p>
        </div>

        {/* Social Proof */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-text px-1">People You Know Here</h3>

          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                M
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text">Maya Chen</p>
                <p className="text-xs text-text-secondary mt-0.5">Lives 0.4 miles from this listing</p>
                <p className="text-xs text-text-secondary">Friends since 2019</p>
              </div>
            </div>

            <button
              onClick={() => setShowMessenger(true)}
              className="mt-3.5 w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold active:scale-[0.98] transition-transform"
            >
              Message Maya
            </button>

            <p className="text-xs text-text-secondary text-center mt-3">
              2 other friends have searched this area
            </p>
          </div>
        </div>

        {/* Ask a Neighbor */}
        <button className="w-full py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform bg-card">
          <MessageCircle size={18} />
          Ask a verified resident about this neighborhood
        </button>
      </div>

      {showMessenger && <MessengerModal onClose={() => setShowMessenger(false)} />}
    </div>
  )
}
