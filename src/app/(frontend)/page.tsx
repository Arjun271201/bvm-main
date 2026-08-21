import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import Hero from '@/components/Hero'
import ExploreBVM from '@/components/ExploreBVM'
import LatestUploads from '@/components/LatestUploads'
import FeaturedSongs from '@/components/FeaturedSongs'
import CoursesSection from '@/components/Courses'
import FeaturedBooks from '@/components/FeaturedBooks'
import SupportBVM from '@/components/SupportBVM'
import TestimonialsSection from '@/components/Testimonials'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <Hero />
      <ExploreBVM />
      <LatestUploads />
      <FeaturedSongs />
      <CoursesSection />
      <FeaturedBooks />
      <SupportBVM />
      <TestimonialsSection />
    </div>
  )
}
