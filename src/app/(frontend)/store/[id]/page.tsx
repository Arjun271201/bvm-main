import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductActions from './ProductActions'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let product: any
  try {
    product = await payload.findByID({ collection: 'products', id })
  } catch {
    product = null
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-8 text-center text-white">
        <p>Product not found.</p>
        <a href="/" className="text-yellow-400 underline">
          Go back home
        </a>
      </div>
    )
  }

  const images = Array.isArray(product.images)
    ? product.images.map((img: any) =>
        typeof img.image === 'object' && img.image?.url ? img.image.url : img.image,
      )
    : []

  const { docs: otherProducts } = await payload.find({
    collection: 'products',
    where: { id: { not_equals: id } },
    limit: 8,
  })

  return (
    <div className="max-w-[1200px] mx-auto pt-16 pb-16 px-4 text-white md:pt-20">
      <div className="max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className=" rounded-xl overflow-hidden bg-stone-100">
            {images[0] && (
              <img src={images[0]} alt={product.title} className="w-100 h-100 object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {images.slice(1, 5).map((img: string, i: number) => (
                <div key={i} className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100">
                  <img src={img} alt="" className="w-100 h-100 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-serif font-semibold mb-3">{product.title}</h1>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-2xl font-semibold text-yellow-300">₹{product.price}</span>
            {product.comparePrice && (
              <span className="text-stone-500 line-through text-lg">₹{product.comparePrice}</span>
            )}
          </div>

          {product.description && (
            <p className="text-stone-300 leading-relaxed mb-6">{product.description}</p>
          )}

          <p className="text-sm mb-6">
            {product.stock > 0 ? (
              <span className="text-green-400">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-400">Out of Stock</span>
            )}
          </p>

          <ProductActions
            id={product.id}
            title={product.title}
            price={product.price}
            image={images[0]}
            inStock={product.stock > 0}
          />
        </div>
      </div>

      {otherProducts.length > 0 && (
        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="mb-6 text-2xl font-serif font-semibold">More Books</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-6 items-stretch">
            {otherProducts.map((otherProduct: any) => {
              const firstImage = Array.isArray(otherProduct.images)
                ? otherProduct.images[0]?.image
                : null
              const imageUrl =
                typeof firstImage === 'object' && firstImage?.url ? firstImage.url : firstImage

              return (
                <div
                  key={otherProduct.id}
                  className="rounded-xl overflow-hidden bg-stone-900 flex flex-col h-full"
                >
                  <a
                    href={`/store/${otherProduct.id}`}
                    className="group relative aspect-[3/4] block w-full overflow-hidden"
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={otherProduct.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    {otherProduct.description && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/75 p-4 text-center text-xs leading-relaxed text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="line-clamp-6">{otherProduct.description}</span>
                      </span>
                    )}
                    <span
                      className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-lg ${otherProduct.stock > 0 ? 'bg-emerald-400 text-stone-950' : 'bg-red-400 text-white'}`}
                    >
                      {otherProduct.stock > 0 ? `In Stock (${otherProduct.stock})` : 'Out of Stock'}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-10 text-left text-sm font-medium leading-tight text-white">
                      {otherProduct.title}
                    </span>
                  </a>
                  <div className="p-3 mt-auto">
                    <a
                      href={`/store/${otherProduct.id}`}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-400 to-yellow-100 text-stone-900 text-sm font-medium py-2 rounded-full hover:opacity-90 transition-opacity"
                    >
                      View
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
