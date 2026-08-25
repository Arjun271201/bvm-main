import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 items-stretch">
          {products.map((product: any) => {
            const firstImage = Array.isArray(product.images) ? product.images[0]?.image : null
            const imgUrl =
              typeof firstImage === 'object' && firstImage?.url ? firstImage.url : firstImage

            return (
              <div
                key={product.id}
                className="rounded-xl overflow-hidden bg-stone-900 flex flex-col h-full"
              >
                <a
                  href={`/store/${product.id}`}
                  className="group relative aspect-[3/4] block w-full overflow-hidden"
                >
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {product.description && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/75 p-4 text-center text-xs leading-relaxed text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="line-clamp-6">{product.description}</span>
                    </span>
                  )}
                  <span
                    className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-lg ${product.stock > 0 ? 'bg-emerald-400 text-stone-950' : 'bg-red-400 text-white'}`}
                  >
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-10 text-left text-sm font-medium leading-tight text-white">
                    {product.title}
                  </span>
                </a>
                <div className="p-3 mt-auto">
                  <a
                    href={`/store/${product.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-400 to-yellow-100 text-stone-900 text-sm font-medium py-2 rounded-full hover:opacity-90 transition-opacity"
                  >
                    View
                    {/* <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg> */}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
