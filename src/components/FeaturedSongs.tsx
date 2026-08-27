import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import FeaturedSongsClient from './FeaturedSongsClient'

export default async function FeaturedSongs({ heading = 'Featured Songs' }: { heading?: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: songs } = await payload.find({
    collection: 'songs',
    where: { featured: { equals: true } },
    limit: 8,
    depth: 1,
  })

  if (!songs.length) return null

  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">{heading}</h2>
          <a
            href="/songs"
            className="text-stone-200 text-sm border border-yellow-500/40 rounded-full px-4 py-1.5 hover:bg-yellow-500/10"
          >
            View All
          </a>
        </div>

        <FeaturedSongsClient songs={songs} />
      </div>
    </section>
  )
}
