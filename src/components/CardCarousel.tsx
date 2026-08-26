'use client'

import React, { Children, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  children: React.ReactNode
  mobileColumns?: 1 | 2
  desktopColumns?: 3 | 4 | 6
  label: string
}

export default function CardCarousel({
  children,
  mobileColumns = 2,
  desktopColumns = 4,
  label,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState<number>(mobileColumns)
  const cards = Children.toArray(children)

  const columnClasses = {
    '2-3': 'w-[calc(50%_-_10px)] md:w-[calc(33.333333%_-_13.333333px)]',
    '2-4': 'w-[calc(50%_-_10px)] md:w-[calc(25%_-_15px)]',
    '2-6': 'w-[calc(50%_-_10px)] md:w-[calc(16.666667%_-_16.666667px)]',
  } as const
  const cardWidth =
    columnClasses[`${mobileColumns}-${desktopColumns}` as keyof typeof columnClasses]

  useEffect(() => {
    const updateVisibleCount = () => {
      const track = trackRef.current
      const firstCard = track?.firstElementChild as HTMLElement | null
      if (!track || !firstCard) return
      const gap =
        Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0
      setVisibleCount(
        Math.max(1, Math.round((track.clientWidth + gap) / (firstCard.offsetWidth + gap))),
      )
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [mobileColumns])

  const move = (direction: -1 | 1) => {
    const track = trackRef.current
    const firstCard = track?.firstElementChild as HTMLElement | null
    if (!track || !firstCard) return

    const gap =
      Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0
    const maxIndex = Math.max(0, cards.length - visibleCount)
    const nextIndex = Math.max(0, Math.min(maxIndex, currentIndex + direction))
    setCurrentIndex(nextIndex)
    track.scrollTo({ left: nextIndex * (firstCard.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => move(-1)}
        disabled={currentIndex === 0}
        className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-500/40 bg-black/70 text-white transition-opacity hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {cards.map((card, index) => (
          <div key={index} className={`${cardWidth} flex-shrink-0 snap-start`}>
            {card}
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={() => move(1)}
        disabled={currentIndex >= cards.length - visibleCount}
        className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-500/40 bg-black/70 text-white transition-opacity hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  )
}
