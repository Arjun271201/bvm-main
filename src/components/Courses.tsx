import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {courses.map((course: any) => {
            const thumbUrl =
              typeof course.thumbnail === 'object' && course.thumbnail?.url
                ? course.thumbnail.url
                : course.thumbnail
            const lessonCount = Array.isArray(course.lessons) ? course.lessons.length : 0

            return (
              <a
                key={course.id}
                href={`/courses/${course.id}`}
                className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-900"
              >
                {thumbUrl && (
                  <img
                    src={thumbUrl}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

                {/* Lesson count badge */}
                <div className="absolute top-3 right-3 bg-white/95 text-stone-900 text-xs font-medium px-2.5 py-1 rounded-full">
                  {lessonCount} Lessons
                </div>

                {/* Book icon center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    opacity="0.9"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-sm leading-snug">{course.title}</h3>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
