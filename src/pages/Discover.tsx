import { ArrowLeft, Sparkles, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SEARCH_TEXT =
  '3 bedroom house under $400K near good elementary schools in a quiet, walkable neighborhood'

const listings = [
  {
    id: 1,
    price: '$385,000',
    address: '142 Willow Creek Dr, Austin, TX',
    neighborhood: 'Willow Creek',
    beds: 3,
    baths: 2,
    sqft: '1,850',
    match: 87,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    price: '$372,500',
    address: '89 Maple Ridge Ln, Austin, TX',
    neighborhood: 'Maple Ridge',
    beds: 3,
    baths: 2,
    sqft: '1,720',
    match: 74,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    price: '$398,000',
    address: '315 Cedar Park Blvd, Austin, TX',
    neighborhood: 'Cedar Park',
    beds: 3,
    baths: 2.5,
    sqft: '1,940',
    match: 69,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
]

function MatchBadge({ score }: { score: number }) {
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

function ListingCard({
  listing,
  onNeighborhoodTap,
}: {
  listing: (typeof listings)[0]
  onNeighborhoodTap?: () => void
}) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
      {/* Photo placeholder */}
      <div className="relative h-40" style={{ background: listing.gradient }}>
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            size={16}
            className={saved ? 'text-red-500 fill-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      <div className="p-3">
        <p className="text-lg font-bold text-text">{listing.price}</p>
        <p className="text-sm text-text-secondary mt-0.5">
          {onNeighborhoodTap ? (
            <>
              <button
                onClick={onNeighborhoodTap}
                className="text-primary font-medium underline underline-offset-2"
              >
                {listing.neighborhood}
              </button>
              {' · ' + listing.address.split(',').slice(1).join(',').trim()}
            </>
          ) : (
            listing.address
          )}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          {listing.beds} bed &middot; {listing.baths} bath &middot;{' '}
          {listing.sqft} sqft
        </p>
        <div className="mt-2">
          <MatchBadge score={listing.match} />
        </div>
      </div>
    </div>
  )
}

export default function Discover() {
  const navigate = useNavigate()
  const [searching, setSearching] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setSearching(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Top bar */}
      <header className="bg-card px-4 pt-12 pb-3 border-b border-border flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-hover active:bg-hover"
        >
          <ArrowLeft size={22} className="text-text" />
        </button>
        <h1 className="text-lg font-bold text-text">Home Discovery</h1>
      </header>

      <div className="px-4 pt-4">
        {/* AI Search bar */}
        <div className="ai-search-border rounded-xl p-[2px]">
          <div className="bg-card rounded-[10px] flex items-start gap-2 px-3 py-3">
            <Sparkles size={18} className="text-purple-500 mt-0.5 shrink-0" />
            <p className="text-sm text-text leading-snug">{SEARCH_TEXT}</p>
          </div>
        </div>

        {/* Searching state or results */}
        {searching ? (
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-sm text-text-secondary">
              Searching neighborhoods...
            </p>
          </div>
        ) : (
          <>
            {/* Results header */}
            <p className="mt-4 text-sm text-text-secondary font-medium">
              15 homes found &middot; Sorted by neighborhood match
            </p>

            {/* Listing cards */}
            <div className="mt-3 flex flex-col gap-3 pb-4">
              {listings.map((listing, i) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onNeighborhoodTap={
                    i === 0 ? () => navigate('/neighborhood') : undefined
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
