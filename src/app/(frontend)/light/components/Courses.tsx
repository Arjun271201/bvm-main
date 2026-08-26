import Link from 'next/link'
import CardCarousel from '@/components/CardCarousel'

type Course = {
  id: string
  title: string
  subtitle: string
  lessonCount: number
  image: string
}

export default function Courses({ courses }: { courses: Course[] }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#241711] text-2xl font-semibold">Courses</h2>
        <Link
          href="/courses"
          className="flex items-center gap-1 text-sm text-[#D9784A] border border-[#D9784A] rounded-full px-4 py-1.5 hover:bg-[#D9784A] hover:text-white transition-colors"
        >
          View More →
        </Link>
      </div>

      <CardCarousel label="courses">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="group relative block aspect-[16/9] overflow-hidden rounded-xl border border-[#EEE1D0] bg-[#2B1A12]"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <span className="absolute left-3 top-3 rounded bg-black/50 px-2 py-1 text-xs text-white">
              {course.lessonCount} Lessons
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="mb-0.5 line-clamp-1 text-sm font-medium text-white">{course.title}</h3>
              <p className="line-clamp-2 text-xs text-white/80">{course.subtitle}</p>
            </div>
          </Link>
        ))}
      </CardCarousel>
    </section>
  )
}
