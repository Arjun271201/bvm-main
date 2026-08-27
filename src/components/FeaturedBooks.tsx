import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import FeaturedBooksClient from './FeaturedBooksClient'

export default async function FeaturedBooks({ heading = 'Featured Books' }: { heading?: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: products } = await payload.find({
    collection: 'products',
    where: { featured: { equals: true } },
    limit: 8,
  })

  if (!products.length) return null

  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">{heading}</h2>
          <a
            href="/store"
            className="text-stone-200 text-sm border border-yellow-500/40 rounded-full px-4 py-1.5 hover:bg-yellow-500/10"
          >
            View All
          </a>
        </div>

        <FeaturedBooksClient products={products} />
      </div>
    </section>
  )
}
