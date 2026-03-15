import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, Plus, Sparkles, Send } from 'lucide-react'

const listings = [
  {
    id: 1,
    price: '$385,000',
    address: '142 Willow Creek Dr, Austin, TX',
    neighborhood: 'Willow Creek',
    beds: 3,
    baths: 2,
    sqft: '1,850',
    neighborhoodScore: 87,
    commuteJay: '28 min',
    schoolsRating: 'A',
    friendsNearby: 1,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    reactions: [{ emoji: '🤔', user: 'Jay' }],
    notes: [
      {
        user: 'Jay',
        color: 'bg-blue-500',
        text: 'Love the neighborhood but commute is a stretch. Can we find something 10 min closer?',
        time: '2h ago',
      },
    ],
  },
  {
    id: 2,
    price: '$372,500',
    address: '89 Maple Ridge Ln, Austin, TX',
    neighborhood: 'Maple Ridge',
    beds: 3,
    baths: 2,
    sqft: '1,720',
    neighborhoodScore: 74,
    commuteJay: '18 min',
    schoolsRating: 'B+',
    friendsNearby: 0,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    reactions: [],
    notes: [],
  },
  {
    id: 3,
    price: '$398,000',
    address: '315 Cedar Park Blvd, Austin, TX',
    neighborhood: 'Cedar Park',
    beds: 3,
    baths: 2.5,
    sqft: '1,940',
    neighborhoodScore: 69,
    commuteJay: '22 min',
    schoolsRating: 'A-',
    friendsNearby: 2,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    reactions: [],
    notes: [],
  },
]

type Listing = (typeof listings)[0]

function ScoreBadge({ score }: { score: number }) {
  const isGreen = score >= 80
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
        isGreen
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {score}% match
    </span>
  )
}

function ReactionRow({
  listing,
  onReact,
}: {
  listing: Listing
  onReact: (emoji: string) => void
}) {
  const emojis = ['👍', '❤️', '🤔']

  return (
    <div className="flex items-center gap-2">
      {emojis.map((emoji) => {
        const reaction = listing.reactions.find((r) => r.emoji === emoji)
        return (
          <button
            key={emoji}
            onClick={() => onReact(emoji)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm border transition-colors ${
              reaction
                ? 'border-primary/30 bg-primary/5'
                : 'border-border bg-card hover:bg-hover'
            }`}
          >
            <span>{emoji}</span>
            {reaction && (
              <span className="text-xs text-text-secondary">{reaction.user}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function ListingCard({
  listing,
  onReact,
}: {
  listing: Listing
  onReact: (emoji: string) => void
}) {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
      {/* Photo placeholder */}
      <div className="relative h-40" style={{ background: listing.gradient }}>
        <div className="absolute top-3 right-3">
          <ScoreBadge score={listing.neighborhoodScore} />
        </div>
      </div>

      <div className="p-3 space-y-2.5">
        <div>
          <p className="text-lg font-bold text-text">{listing.price}</p>
          <p className="text-sm text-text-secondary mt-0.5">{listing.address}</p>
          <p className="text-sm text-text-secondary mt-0.5">
            {listing.beds} bed &middot; {listing.baths} bath &middot;{' '}
            {listing.sqft} sqft
          </p>
        </div>

        {/* Reactions */}
        <ReactionRow listing={listing} onReact={onReact} />

        {/* Notes */}
        {listing.notes.map((note, i) => (
          <div key={i} className="flex items-start gap-2 bg-bg rounded-lg p-2.5">
            <div
              className={`w-6 h-6 rounded-full ${note.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5`}
            >
              {note.user[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text leading-relaxed">{note.text}</p>
              <p className="text-[10px] text-text-secondary mt-1">{note.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompareView({ items }: { items: Listing[] }) {
  type RowDef = {
    label: string
    values: string[]
    best: 'min' | 'max' | 'none'
  }

  const rows: RowDef[] = [
    {
      label: 'Price',
      values: items.map((l) => l.price),
      best: 'min',
    },
    {
      label: 'Bedrooms',
      values: items.map((l) => String(l.beds)),
      best: 'max',
    },
    {
      label: 'Sqft',
      values: items.map((l) => l.sqft),
      best: 'max',
    },
    {
      label: 'Neighborhood Score',
      values: items.map((l) => String(l.neighborhoodScore)),
      best: 'max',
    },
    {
      label: 'Commute (Jay)',
      values: items.map((l) => l.commuteJay),
      best: 'min',
    },
    {
      label: 'Schools Rating',
      values: items.map((l) => l.schoolsRating),
      best: 'none',
    },
    {
      label: 'Friends Nearby',
      values: items.map((l) => String(l.friendsNearby)),
      best: 'max',
    },
  ]

  const getBestIndex = (row: RowDef): number => {
    if (row.best === 'none') {
      // For schools rating, sort alphabetically (A > A- > B+)
      const order = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C']
      let bestIdx = 0
      let bestRank = order.indexOf(row.values[0])
      if (bestRank === -1) bestRank = 99
      row.values.forEach((v, i) => {
        const rank = order.indexOf(v)
        if (rank !== -1 && rank < bestRank) {
          bestRank = rank
          bestIdx = i
        }
      })
      return bestIdx
    }

    const nums = row.values.map((v) => {
      const n = parseFloat(v.replace(/[$,\s]/g, '').replace('min', ''))
      return isNaN(n) ? (row.best === 'min' ? Infinity : -Infinity) : n
    })

    if (row.best === 'min') return nums.indexOf(Math.min(...nums))
    return nums.indexOf(Math.max(...nums))
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Column headers */}
      <div className="grid grid-cols-4 border-b border-border">
        <div className="px-1.5 py-2.5" />
        {items.map((l) => (
          <div key={l.id} className="px-1.5 py-2.5 text-center">
            <div
              className="w-full h-12 rounded-lg mb-1.5"
              style={{ background: l.gradient }}
            />
            <p className="text-[10px] text-text-secondary leading-tight truncate">
              {l.address.split(',')[0]}
            </p>
          </div>
        ))}
      </div>

      {/* Data rows */}
      {rows.map((row, ri) => {
        const bestIdx = getBestIndex(row)
        return (
          <div
            key={ri}
            className={`grid grid-cols-4 ${
              ri < rows.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="px-1.5 py-2.5 text-[11px] font-medium text-text-secondary flex items-center">
              {row.label}
            </div>
            {row.values.map((val, vi) => (
              <div
                key={vi}
                className={`px-1 py-2.5 text-center text-xs font-semibold flex items-center justify-center ${
                  vi === bestIdx ? 'text-accent-green' : 'text-text'
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default function HomeBoard() {
  const navigate = useNavigate()
  const [view, setView] = useState<'cards' | 'compare'>('cards')
  const [savedListings, setSavedListings] = useState(listings)
  const [aiQuery, setAiQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  const handleReact = (listingId: number, emoji: string) => {
    setSavedListings((prev) =>
      prev.map((l) => {
        if (l.id !== listingId) return l
        const existing = l.reactions.find((r) => r.emoji === emoji)
        if (existing) {
          return { ...l, reactions: l.reactions.filter((r) => r.emoji !== emoji) }
        }
        return {
          ...l,
          reactions: [...l.reactions, { emoji, user: 'You' }],
        }
      })
    )
  }

  const handleAiAsk = () => {
    if (!aiQuery.trim()) return
    setAiResponse('Thinking...')
    setAiQuery('')
    setTimeout(() => {
      setAiResponse(
        'Based on your 3 saved homes, 142 Willow Creek Dr has the best school ratings (A) and neighborhood match (87%), but the longest commute at 28 min. 89 Maple Ridge Ln offers the shortest commute at 18 min and lowest price. Consider prioritizing what matters most to your family!'
      )
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Top bar */}
      <header className="bg-card px-4 pt-12 pb-3 border-b border-border flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-hover active:bg-hover"
        >
          <ArrowLeft size={22} className="text-text" />
        </button>
        <h1 className="flex-1 text-lg font-bold text-text">
          Our First Home 🏠
        </h1>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-hover active:bg-hover">
          <Share2 size={20} className="text-text" />
        </button>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* Collaborators row */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold border-2 border-card z-10">
              F
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold border-2 border-card">
              J
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Fiona & Jay</p>
            <p className="text-xs text-text-secondary">3 saved homes</p>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex bg-border rounded-lg p-0.5">
          <button
            onClick={() => setView('cards')}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
              view === 'cards'
                ? 'bg-card text-text shadow-sm'
                : 'text-text-secondary'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setView('compare')}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
              view === 'compare'
                ? 'bg-card text-text shadow-sm'
                : 'text-text-secondary'
            }`}
          >
            Compare
          </button>
        </div>

        {/* Content */}
        {view === 'cards' ? (
          <div className="space-y-3">
            {savedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onReact={(emoji) => handleReact(listing.id, emoji)}
              />
            ))}
          </div>
        ) : (
          <CompareView items={savedListings} />
        )}

        {/* AI Response */}
        {aiResponse && (
          <div
            className="rounded-xl p-3.5 border-l-4 border-purple-500"
            style={{ background: 'linear-gradient(135deg, #f3f0ff 0%, #ffffff 100%)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-purple-500" />
              <span className="text-xs font-semibold text-purple-700">Meta AI</span>
            </div>
            <p className="text-sm text-text leading-relaxed">{aiResponse}</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center active:scale-95 transition-transform z-30"
        style={{ maxWidth: '390px' }}
      >
        <Plus size={24} className="text-white" />
      </button>

      {/* AI Q&A bar */}
      <div className="fixed bottom-16 left-0 right-0 z-20">
        <div className="max-w-[390px] mx-auto px-3 py-2 bg-card border-t border-border flex items-center gap-2">
          <Sparkles size={16} className="text-purple-500 shrink-0" />
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
            placeholder="Ask anything about these homes..."
            className="flex-1 bg-bg rounded-full px-3 py-1.5 text-sm text-text outline-none placeholder:text-text-secondary"
          />
          <button
            onClick={handleAiAsk}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center active:scale-95 transition-transform shrink-0"
          >
            <Send size={14} className="text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
