import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { MAX_HOME_PAGE_VIDEOS } from '@/lib/homepageLimits'
import VideoCarousel from './VideoCarousel'

export default async function LatestUploads({ heading = 'Latest Uploads' }: { heading?: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: videos } = await payload.find({
    collection: 'videos',
    sort: '-publishedDate',
    limit: MAX_HOME_PAGE_VIDEOS,
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
    <section className="bg-[#2c0002] py-12 md:py-14 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">{heading}</h2>
          <a
            href="/videos"
            className="bg-[#FFE7C3] hover:bg-[#3a0a0a] text-[#512D26] hover:text-yellow-400 border border-transparent hover:border-yellow-400/60 text-sm font-semibold rounded-full px-4 py-1.5 transition-all duration-200"
          >
            View All
          </a>
        </div>

        <VideoCarousel videos={videoData} />
      </div>
    </section>
  )
}
