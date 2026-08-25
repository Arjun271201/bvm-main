'use client'

import React, { useState } from 'react'

type Props = {
  products: any[]
}

export default function FeaturedBooksClient({ products }: Props) {
  const pageSize = 6
  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = Math.ceil(products.length / pageSize)
  const visibleProducts = products.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  const previous = () => setPageIndex((current) => Math.max(0, current - 1))
  const next = () => setPageIndex((current) => Math.min(pageCount - 1, current + 1))

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          onClick={previous}
          disabled={pageIndex === 0}
          aria-label="Previous featured book"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-yellow-500/40 text-xl text-white transition-opacity hover:bg-yellow-500/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>

        <div className="grid min-w-0 flex-1 grid-cols-2 items-stretch gap-5 md:grid-cols-3">
          {visibleProducts.map((product: any) => {
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
        </div>

        <button
          type="button"
          onClick={next}
          disabled={pageIndex === pageCount - 1}
          aria-label="Next featured book"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-yellow-500/40 text-xl text-white transition-opacity hover:bg-yellow-500/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>
      </div>
      <p className="text-xs text-stone-500">
        {pageIndex + 1} / {pageCount}
      </p>
    </div>
  )
}
