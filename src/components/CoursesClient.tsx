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
            className="group flex flex-col overflow-hidden rounded-xl bg-[#3a0a0a] h-full"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              {thumbUrl && (
                <img
                  src={thumbUrl}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-stone-900 shadow">
                {lessonCount} Lessons
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1 min-h-[94px]">
              <h3 className="text-sm font-semibold text-white group-hover:text-yellow-400 line-clamp-1 mb-1">
                {course.title}
              </h3>
              {course.description && (
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              )}
            </div>
          </a>
        )
      })}
    </CardCarousel>
  )
}
