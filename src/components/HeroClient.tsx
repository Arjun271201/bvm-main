'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = {
  eyebrow?: string
  heading: string
  subtext?: string
  ctaLabel?: string
  ctaLink?: string
  image?: string
}

export default function HeroClient({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const slide = slides[index % slides.length]

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  // Auto-transition every 5 seconds
  useEffect(() => {
    if (isHovered || slides.length <= 1) return

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isHovered, slides.length])

  return (
    <section
      className="relative w-full h-[90vh] min-h-[480px] overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slide.image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center px-8">
        <div className="max-w-xl transition-opacity duration-500 ease-in-out">
          {slide.eyebrow && (
            <p className="text-stone-200/80 text-sm tracking-wider mb-3">{slide.eyebrow}</p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-yellow-100 leading-tight mb-5">
            {slide.heading}
          </h1>
          {slide.subtext && (
            <p className="text-stone-200/85 text-base leading-relaxed mb-7">{slide.subtext}</p>
          )}
          {slide.ctaLabel && (
            <a
              href={slide.ctaLink || '#'}
              className="group inline-flex items-center gap-2 bg-[#FFE7C3] hover:bg-[#3a0a0a] text-[#512D26] hover:text-yellow-400 border border-transparent hover:border-yellow-400/60 font-semibold px-6 py-3 rounded-full transition-all duration-200"
            >
              <span className="transition-colors duration-200">{slide.ctaLabel}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="transition-colors duration-200">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </>
      )}
    </section>
  )
}
