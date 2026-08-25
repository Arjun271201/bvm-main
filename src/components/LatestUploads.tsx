import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function LatestUploads() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: videos } = await payload.find({
    collection: 'videos',
    sort: '-publishedDate',
    limit: 8,
  })

  if (!videos.length) return null

  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Latest Uploads</h2>
          <a
            href="/videos"
            className="text-stone-200 text-sm border border-yellow-500/40 rounded-full px-4 py-1.5 hover:bg-yellow-500/10"
          >
            View All
          </a>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-700">
          {videos.map((video: any) => {
            const thumbUrl =
              typeof video.thumbnail === 'object' && video.thumbnail?.url
                ? video.thumbnail.url
                : video.thumbnail

            return (
              <a
                key={video.id}
                href={`/videos/${video.id}`}
                className="group relative flex-shrink-0 w-[300px] aspect-[16/9] rounded-xl overflow-hidden"
              >
                {thumbUrl && (
                  <img
                    src={thumbUrl}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                {/* Gradient overlay - Featured Songs style */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Text overlaid at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium mb-1 line-clamp-1">{video.title}</h3>
                  <p className="text-stone-200/85 text-sm line-clamp-2">{video.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
