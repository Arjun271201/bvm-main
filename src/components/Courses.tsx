import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import CoursesClient from './CoursesClient'

export default async function CoursesSection() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: courses } = await payload.find({
    collection: 'courses',
    limit: 8,
  })

  if (!courses.length) return null

  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Courses</h2>
          <a
            href="/courses"
            className="text-stone-200 text-sm border border-yellow-500/40 rounded-full px-4 py-1.5 hover:bg-yellow-500/10"
          >
            View All
          </a>
        </div>

        <CoursesClient courses={courses} />
      </div>
    </section>
  )
}
