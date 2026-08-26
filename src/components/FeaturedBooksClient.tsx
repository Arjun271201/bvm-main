'use client'

import React from 'react'
import CardCarousel from './CardCarousel'

export default function FeaturedBooksClient({ products }: { products: any[] }) {
  return (
    <CardCarousel label="featured books" desktopColumns={6}>
      {products.map((product: any) => {
        const firstImage = Array.isArray(product.images) ? product.images[0]?.image : null
        const imageUrl =
          typeof firstImage === 'object' && firstImage?.url ? firstImage.url : firstImage

        return (
          <div
            key={product.id}
            className="flex h-full flex-col overflow-hidden rounded-xl bg-stone-900"
          >
            <a
              href={`/store/${product.id}`}
              className="group relative block aspect-[3/4] w-full overflow-hidden"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {product.description && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/75 p-4 text-center text-xs leading-relaxed text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="line-clamp-6">{product.description}</span>
                </span>
              )}
              <span
                className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-lg ${product.stock > 0 ? 'bg-emerald-400 text-stone-950' : 'bg-red-400 text-white'}`}
              >
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-10 text-left text-sm font-medium leading-tight text-white">
                {product.title}
              </span>
            </a>
            <div className="mt-auto p-3">
              <a
                href={`/store/${product.id}`}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-yellow-100 py-2 text-sm font-medium text-stone-900 transition-opacity hover:opacity-90"
              >
                View
              </a>
            </div>
          </div>
        )
      })}
    </CardCarousel>
  )
}
