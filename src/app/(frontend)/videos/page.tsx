import Link from 'next/link'
import { ArrowRight, CalendarDays, PlayCircle, Video } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'

type Props = {
  searchParams: Promise<{ category?: string }>
}

function getMediaUrl(media: unknown) {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as { url?: string }).url
  }

  return typeof media === 'string' ? media : undefined
}

function getCategoryId(category: unknown) {
  if (typeof category === 'object' && category !== null && 'id' in category) {
    return String((category as { id: string | number }).id)
  }

  return category ? String(category) : undefined
}

export default async function VideosPage({ searchParams }: Props) {
  const { category: selectedSlug } = await searchParams
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [{ docs: languages }, { docs: videos }] = await Promise.all([
    payload.find({ collection: 'languages', sort: 'order', limit: 100 }),
    payload.find({ collection: 'videos', sort: '-publishedDate', limit: 1000, depth: 1 }),
  ])

  const languagesWithVideos = languages
    .map((language: any) => ({
      ...language,
      videos: videos.filter(
        (video: any) => getCategoryId(video.languageCategory) === String(language.id),
      ),
    }))
    .filter((language: any) => language.videos.length > 0)

  const selectedCategory = languagesWithVideos.find(
    (language: any) => language.slug === selectedSlug,
  )
  const visibleCategories = selectedCategory ? [selectedCategory] : languagesWithVideos

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-14 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-yellow-500">
            Home / Videos
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Choose Your Language
          </h1>
          <p className="mt-4 text-base text-stone-400">
            Select a language to explore channels, playlists, and the latest video uploads.
          </p>
        </div>

        <div
          className="mb-8 flex flex-wrap items-center gap-2"
          aria-label="Filter videos by language"
        >
          <span className="mr-2 text-sm font-medium text-stone-400">Filter by language:</span>
          <Link
            href="/videos"
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              !selectedSlug
                ? 'border-yellow-500 bg-yellow-500 text-stone-950'
                : 'border-yellow-500/30 bg-stone-900 text-stone-300 hover:border-yellow-500 hover:text-yellow-400'
            }`}
          >
            All Languages
          </Link>
          {languagesWithVideos.map((category: any) => (
            <Link
              key={category.id}
              href={`/videos?category=${encodeURIComponent(category.slug)}`}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                selectedSlug === category.slug
                  ? 'border-yellow-500 bg-yellow-500 text-stone-950'
                  : 'border-yellow-500/30 bg-stone-900 text-stone-300 hover:border-yellow-500 hover:text-yellow-400'
              }`}
            >
              {category.title}
            </Link>
          ))}
        </div>

        {selectedCategory && (
          <Link
            href="/videos"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-yellow-400"
          >
            View all languages <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}

        {visibleCategories.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-stone-900 p-10 text-center text-stone-400">
            No video categories are available yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category: any) => {
              const latestVideo = category.videos[0]
              const imageUrl = getMediaUrl(category.image) || getMediaUrl(latestVideo.thumbnail)
              const latestDate = latestVideo.publishedDate
                ? new Date(latestVideo.publishedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : null

              return (
                <article
                  key={category.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-stone-900 shadow-2xl"
                >
                  <div className="relative aspect-[1.8/1] overflow-hidden bg-[#2B1A12]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={category.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/70">
                        <Video size={36} aria-hidden="true" />
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-[#B34C13] px-3 py-1 text-[11px] font-medium text-white">
                      Latest Upload
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="text-xl font-medium text-white">{category.title}</h2>
                    <div className="mt-2 flex items-center gap-2 text-xs text-stone-400">
                      <span className="inline-flex items-center gap-1">
                        <Video size={14} className="text-yellow-500" aria-hidden="true" />
                        {category.videos.length} Videos
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <PlayCircle size={14} className="text-yellow-500" aria-hidden="true" />
                        Watch now
                      </span>
                    </div>
                    {latestDate && (
                      <p className="mt-3 inline-flex items-center gap-1 text-xs text-stone-500">
                        <CalendarDays size={13} aria-hidden="true" /> Latest: {latestDate}
                      </p>
                    )}
                    <Link
                      href={`/videos?category=${encodeURIComponent(category.slug)}`}
                      className="mt-auto inline-flex self-end items-center gap-1 pt-5 text-sm font-medium text-yellow-400 hover:text-yellow-300"
                    >
                      Explore <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {selectedCategory && (
          <section className="mt-14">
            <h2 className="mb-5 text-2xl font-semibold text-white">
              {selectedCategory.title} Videos
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {selectedCategory.videos.map((video: any) => {
                const thumbnailUrl = getMediaUrl(video.thumbnail)
                return (
                  <Link
                    key={video.id}
                    href={`/videos/${video.id}`}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-stone-900 shadow-2xl"
                  >
                    <div className="aspect-video overflow-hidden bg-[#2B1A12]">
                      {thumbnailUrl && (
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-medium text-white">{video.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-stone-400">
                        {video.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <p className="mt-14 text-center text-sm text-stone-500">More languages coming soon...</p>
      </div>
    </main>
  )
}
