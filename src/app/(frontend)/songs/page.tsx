import Link from 'next/link'
import { ArrowRight, Music2 } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import SongCard from './SongCard'

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

export default async function SongsPage({ searchParams }: Props) {
  const { category: selectedSlug } = await searchParams
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const [{ docs: languages }, { docs: songs }] = await Promise.all([
    payload.find({ collection: 'languages', sort: 'order', limit: 100 }),
    payload.find({ collection: 'songs', sort: '-createdAt', limit: 1000, depth: 1 }),
  ])

  const languagesWithSongs = languages
    .map((language: any) => ({
      ...language,
      songs: songs.filter(
        (song: any) => getCategoryId(song.languageCategory) === String(language.id),
      ),
    }))
    .filter((language: any) => language.songs.length > 0)

  const selectedCategory = languagesWithSongs.find(
    (language: any) => language.slug === selectedSlug,
  )
  const visibleCategories = selectedCategory ? [selectedCategory] : languagesWithSongs

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-14 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1250px]">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-yellow-500">
            Home / Songs
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Explore Songs</h1>
          <p className="mt-4 text-base text-stone-400">
            Browse devotional music by category and discover your next favourite song.
          </p>
        </div>

        <div
          className="mb-8 flex flex-wrap items-center gap-2"
          aria-label="Filter songs by category"
        >
          <span className="mr-2 text-sm font-medium text-stone-400">Filter by language:</span>
          <Link
            href="/songs"
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              !selectedSlug
                ? 'border-yellow-500 bg-yellow-500 text-stone-950'
                : 'border-yellow-500/30 bg-stone-900 text-stone-300 hover:border-yellow-500 hover:text-yellow-400'
            }`}
          >
            All Languages
          </Link>
          {languagesWithSongs.map((category: any) => (
            <Link
              key={category.id}
              href={`/songs?category=${encodeURIComponent(category.slug)}`}
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

        {visibleCategories.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-stone-900 p-10 text-center text-stone-400">
            No song categories are available yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category: any) => {
              const firstSong = category.songs[0]
              const imageUrl = getMediaUrl(category.image) || getMediaUrl(firstSong.coverImage)

              return (
                <article
                  key={category.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-stone-900 shadow-2xl"
                >
                  <div className="relative aspect-[1.8/1] overflow-hidden bg-black">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={category.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-stone-500">
                        <Music2 size={38} aria-hidden="true" />
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-[11px] font-medium text-stone-950">
                      Featured Songs
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="text-xl font-medium">{category.title}</h2>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs text-stone-400">
                      <Music2 size={14} className="text-yellow-500" aria-hidden="true" />
                      {category.songs.length} Songs
                    </p>
                    <Link
                      href={`/songs?category=${encodeURIComponent(category.slug)}`}
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
            <h2 className="mb-5 text-2xl font-semibold">{selectedCategory.title} Songs</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {selectedCategory.songs.map((song: any) => {
                const coverUrl = getMediaUrl(song.coverImage)
                const audioUrl = getMediaUrl(song.audioFile)
                return (
                  <SongCard
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    coverUrl={coverUrl}
                    audioUrl={audioUrl}
                    durationLabel={song.duration}
                  />
                )
              })}
            </div>
          </section>
        )}

        <p className="mt-14 text-center text-sm text-stone-500">More songs coming soon...</p>
      </div>
    </main>
  )
}
