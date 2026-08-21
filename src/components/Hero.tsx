import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import HeroClient from './HeroClient'

export default async function Hero() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  const slides = (homepage?.heroSlides || []).map((slide: any) => {
    const imageUrl =
      typeof slide.backgroundImage === 'object' && slide.backgroundImage?.url
        ? slide.backgroundImage.url
        : slide.backgroundImage

    return {
      eyebrow: slide.eyebrow,
      heading: slide.heading,
      subtext: slide.subtext,
      ctaLabel: slide.ctaLabel,
      ctaLink: slide.ctaLink,
      image: imageUrl,
    }
  })

  if (!slides.length) return null

  return <HeroClient slides={slides} />
}
