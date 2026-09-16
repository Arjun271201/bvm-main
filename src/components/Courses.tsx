import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import CoursesClient from './CoursesClient'

export default async function CoursesSection({ heading = 'Courses' }: { heading?: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: courses } = await payload.find({
    collection: 'courses',
    limit: 8,
  })

  if (!courses.length) return null

  return (
    <section className="bg-[#2c0002] py-[25px] px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">{heading}</h2>
          <a
            href="/courses"
            className="bg-[#FFE7C3] text-[#512D26] text-sm font-semibold rounded-full px-4 py-1.5 hover:bg-[#f7d89b] transition-colors"
          >
            View All
          </a>
        </div>

        <CoursesClient courses={courses} />
      </div>
    </section>
  )
}
