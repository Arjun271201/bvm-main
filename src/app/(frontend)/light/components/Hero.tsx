'use client'

import { useState } from 'react'

type HeroSlide = {
  eyebrow: string
  heading: string
  meta: string
  subtext: string
  backgroundImage: string
}

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0)
  const slide = slides[active]

  return (
    <section className="relative w-full h-[520px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slide.backgroundImage})` }}
      />


      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto h-full flex flex-col justify-end px-6 pb-14">
        <span className="inline-block w-fit bg-[#D9784A] text-white text-xs font-medium px-3 py-1 rounded mb-4">
          {slide.eyebrow}
        </span>
        <h1 className="text-[#241711] text-4xl md:text-5xl font-semibold max-w-xl mb-3">
          {slide.heading}
        </h1>
        <p className="text-[#5C4E42] text-sm mb-2">{slide.meta}</p>
        <p className="text-[#5C4E42] text-sm max-w-md mb-6">{slide.subtext}</p>

        <div className="flex items-center gap-3 mb-8">
          <button className="flex items-center gap-2 bg-[#D9784A] hover:bg-[#c96b3f] text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors">
            ▶ Watch Now
          </button>
          <button className="flex items-center gap-2 border border-[#D9C7B0] text-[#241711] text-sm font-medium px-5 py-2.5 rounded-md hover:bg-white transition-colors">
            ⓘ More Info
          </button>
        </div>

        {/* Slide dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? 'w-8 bg-[#D9784A]' : 'w-4 bg-[#D9C7B0]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
