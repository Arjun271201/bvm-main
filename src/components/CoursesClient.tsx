'use client'

import React from 'react'
import CardCarousel from './CardCarousel'

export default function CoursesClient({ courses }: { courses: any[] }) {
  return (
    <CardCarousel label="courses">
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
            className="group relative block aspect-[16/9] w-full overflow-hidden rounded-xl bg-stone-900"
          >
            {thumbUrl && (
              <img
                src={thumbUrl}
                alt={course.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />
            <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-stone-900">
              {lessonCount} Lessons
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-sm font-medium leading-snug text-white">{course.title}</h3>
            </div>
          </a>
        )
      })}
    </CardCarousel>
  )
}
