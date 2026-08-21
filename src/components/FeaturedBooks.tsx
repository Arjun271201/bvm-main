import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import BookCard from './BookCard'

export default async function FeaturedBooks() {
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
          <h2 className="text-white text-2xl font-semibold">Featured Books</h2>
          <a
            href="/store"
            className="text-stone-200 text-sm border border-yellow-500/40 rounded-full px-4 py-1.5 hover:bg-yellow-500/10"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
          {products.map((product: any) => {
            const firstImage = Array.isArray(product.images) ? product.images[0]?.image : null
            const imgUrl =
              typeof firstImage === 'object' && firstImage?.url ? firstImage.url : firstImage

            return (
              <div
                key={product.id}
                className="rounded-xl overflow-hidden bg-stone-900 flex flex-col"
              >
                <a href={`/store/${product.id}`} className="relative aspect-[3/4] block">
                  {imgUrl && (
                    <img src={imgUrl} alt={product.title} className="w-full h-full object-cover" />
                  )}
                </a>
                <div className="p-3">
                  <BookCard
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={imgUrl}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
