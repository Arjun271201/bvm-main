'use client'

import React, { useState } from 'react'

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
  const slide = slides[index % slides.length]

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section className="relative w-full h-[70vh] min-h-[480px] overflow-hidden bg-black">
      {slide.image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto h-full flex items-center px-8">
        <div className="max-w-xl">
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-400 to-yellow-100 text-stone-900 font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              {slide.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10"
          >
            ›
          </button>
        </>
      )}
    </section>
  )
}
