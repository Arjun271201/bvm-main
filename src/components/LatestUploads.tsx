import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import VideoCarousel from './VideoCarousel'

export default async function LatestUploads() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: videos } = await payload.find({
    collection: 'videos',
    sort: '-publishedDate',
    limit: 8,
  })

  if (!videos.length) return null

  const videoData = videos.map((video: any) => {
    const thumbUrl =
      typeof video.thumbnail === 'object' && video.thumbnail?.url
        ? video.thumbnail.url
        : video.thumbnail

    return {
      id: video.id,
      title: video.title,
      description: video.description,
      thumbUrl,
    }
  })

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

        <VideoCarousel videos={videoData} />
      </div>
    </section>
  )
}
