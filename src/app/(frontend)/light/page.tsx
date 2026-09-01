import { getPayload } from 'payload'
import config from '@/payload.config'
import { MAX_HOME_PAGE_VIDEOS } from '@/lib/homepageLimits'
import Hero from './components/Hero'
import ExploreBVM from './components/ExploreBVM'
import LatestUploads from './components/LatestUploads'
import FeaturedSongs from './components/FeaturedSongs'
import FeaturedBooks from './components/FeaturedBooks'
import Courses from './components/Courses'
import SupportBVM from './components/SupportBVM'
import Testimonials from './components/Testimonials'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const homepage = await payload.findGlobal({ slug: 'homepage' })
  const [
    { docs: videos },
    { docs: songs },
    { docs: books },
    { docs: courses },
    { docs: testimonials },
  ] = await Promise.all([
    payload.find({ collection: 'videos', sort: '-publishedDate', limit: MAX_HOME_PAGE_VIDEOS }),
    payload.find({ collection: 'songs', where: { featured: { equals: true } }, limit: 8 }),
    payload.find({ collection: 'products', where: { featured: { equals: true } }, limit: 8 }),
    payload.find({ collection: 'courses', where: { featured: { equals: true } }, limit: 8 }),
    payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, limit: 8 }),
  ])

  const heroSlides = (homepage?.heroSlides || []).map((slide: any) => ({
    eyebrow: slide.eyebrow || '',
    heading: slide.heading,
    meta: 'Bhakti Vedanta Media',
    subtext: slide.subtext || '',
    backgroundImage:
      typeof slide.backgroundImage === 'object' && slide.backgroundImage?.url
        ? slide.backgroundImage.url
        : slide.backgroundImage,
  }))

  const uploadData = videos.map((video: any) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    image:
      typeof video.thumbnail === 'object' && video.thumbnail?.url
        ? video.thumbnail.url
        : video.thumbnail,
  }))

  const songData = songs.map((song: any) => ({
    id: song.id,
    title: song.title,
    artist: song.artist || 'BVM Music',
    duration: song.duration || '',
    image:
      typeof song.coverImage === 'object' && song.coverImage?.url
        ? song.coverImage.url
        : song.coverImage,
  }))

  const bookData = books.map((book: any) => {
    const firstImage = Array.isArray(book.images) ? book.images[0]?.image : null
    return {
      id: book.id,
      title: book.title,
      author: book.description || 'Bhakti Vedanta Media',
      description: book.description || '',
      stock: book.stock || 0,
      image: typeof firstImage === 'object' && firstImage?.url ? firstImage.url : firstImage,
    }
  })

  const courseData = courses.map((course: any) => ({
    id: course.id,
    title: course.title,
    subtitle: course.description || 'Explore Krishna consciousness',
    lessonCount: Array.isArray(course.lessons) ? course.lessons.length : 0,
    image:
      typeof course.thumbnail === 'object' && course.thumbnail?.url
        ? course.thumbnail.url
        : course.thumbnail,
  }))

  const testimonialData = testimonials.map((testimonial: any) => ({
    id: testimonial.id,
    quote: testimonial.message,
    name: testimonial.name,
    role: testimonial.location || 'BVM Community',
    avatar:
      typeof testimonial.photo === 'object' && testimonial.photo?.url
        ? testimonial.photo.url
        : '/placeholder-avatar.png',
  }))

  return (
    <main className="bg-[#FBF3E8] min-h-screen">
      {heroSlides.length > 0 && <Hero slides={heroSlides} />}
      <ExploreBVM />
      <LatestUploads uploads={uploadData} />
      <FeaturedSongs songs={songData} />
      <FeaturedBooks books={bookData} />
      <Courses courses={courseData} />
      <SupportBVM />
      <Testimonials testimonials={testimonialData} />
    </main>
  )
}
