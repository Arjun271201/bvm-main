import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function FeaturedSongs() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: songs } = await payload.find({
    collection: 'songs',
    where: { featured: { equals: true } },
    limit: 8,
  })

  if (!songs.length) return null

  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Featured Songs</h2>
          <a
            href="/songs"
            className="text-stone-200 text-sm border border-yellow-500/40 rounded-full px-4 py-1.5 hover:bg-yellow-500/10"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {songs.map((song: any) => {
            const coverUrl =
              typeof song.coverImage === 'object' && song.coverImage?.url
                ? song.coverImage.url
                : song.coverImage

            return (
              <a
                key={song.id}
                href={`/songs/${song.id}`}
                className="group relative aspect-[16/9] rounded-xl overflow-hidden"
              >
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt={song.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                {/* Sound wave icon top-left */}
                <div className="absolute top-3 left-3 text-white/90">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="4" y1="10" x2="4" y2="14" />
                    <line x1="8" y1="6" x2="8" y2="18" />
                    <line x1="12" y1="3" x2="12" y2="21" />
                    <line x1="16" y1="7" x2="16" y2="17" />
                    <line x1="20" y1="10" x2="20" y2="14" />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium">{song.title}</h3>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
