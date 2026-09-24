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
    <section className="bg-[#2c0002] py-[25px] px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">{heading}</h2>
          <a
            href="/store"
            className="bg-[#FFE7C3] hover:bg-[#3a0a0a] text-[#512D26] hover:text-yellow-400 border border-transparent hover:border-yellow-400/60 text-sm font-semibold rounded-full px-4 py-1.5 transition-all duration-200"
          >
            View All
          </a>
        </div>

        <FeaturedBooksClient products={products} />
      </div>
    </section>
  )
}
