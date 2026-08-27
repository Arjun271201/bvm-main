'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Video = {
  id: string
  title: string
  description?: string
  thumbUrl?: string
}

export default function VideoCarousel({ videos }: { videos: Video[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(2)

  useEffect(() => {
    const updateVisibleCount = () => {
      const container = scrollRef.current
      const firstCard = container?.firstElementChild as HTMLElement | null
      const secondCard = container?.children[1] as HTMLElement | undefined
      if (!container || !firstCard) return

      const gap = secondCard
        ? secondCard.offsetLeft - firstCard.offsetLeft - firstCard.offsetWidth
        : 0
      setVisibleCount(
        Math.max(1, Math.round((container.clientWidth + gap) / (firstCard.offsetWidth + gap))),
      )
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [videos.length])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const card = scrollRef.current.firstElementChild as HTMLElement | null
    if (!card) return
    const nextIndex = Math.max(
      0,
      Math.min(videos.length - visibleCount, currentIndex + (direction === 'left' ? -1 : 1)),
    )
    const gap = scrollRef.current.children[1]
      ? (scrollRef.current.children[1] as HTMLElement).offsetLeft -
        card.offsetLeft -
        card.offsetWidth
      : 0
    setCurrentIndex(nextIndex)
    scrollRef.current.scrollTo({
      left: nextIndex * (card.offsetWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        aria-label="Scroll left"
        onClick={() => scroll('left')}
        disabled={currentIndex === 0}
        className="absolute -left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-opacity hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      {/* Right arrow */}
      <button
        aria-label="Scroll right"
        onClick={() => scroll('right')}
        disabled={currentIndex >= videos.length - visibleCount}
        className="absolute -right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-opacity hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      {/* Scrollable track - scrollbar hidden */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {videos.map((video) => (
          <a
            key={video.id}
            href={`/videos/${video.id}`}
            className="group flex-shrink-0 snap-start overflow-hidden rounded-xl bg-stone-900 md:w-[calc((100%_-_60px)_/_4)] w-[calc((100%_-_20px)_/_2)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              {video.thumbUrl && (
                <img
                  src={video.thumbUrl}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="min-h-[112px] p-4">
              <h3 className="mb-1 line-clamp-1 font-medium text-white">{video.title}</h3>
              {video.description && (
                <p className="line-clamp-2 text-sm text-stone-400">{video.description}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
