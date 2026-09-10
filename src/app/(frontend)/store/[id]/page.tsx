import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ProductDetailClient from './ProductDetailClient'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let productDoc: any
  try {
    productDoc = await payload.findByID({ collection: 'products', id })
  } catch {
    productDoc = null
  }

  if (!productDoc) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-8 text-center text-white">
        <p className="text-xl font-bold mb-4">Product not found.</p>
        <a href="/store" className="text-amber-400 underline">
          Go back to store
        </a>
      </div>
    )
  }

  const images = Array.isArray(productDoc.images)
    ? productDoc.images
        .map((img: any) =>
          typeof img.image === 'object' && img.image?.url ? img.image.url : img.image,
        )
        .filter(Boolean)
    : []

  const formattedProduct = {
    id: productDoc.id,
    title: productDoc.title,
    price: productDoc.price,
    comparePrice: productDoc.comparePrice,
    description: productDoc.description,
    stock: productDoc.stock ?? 0,
    category: productDoc.category,
    images: images,
  }

  const { docs: otherProductDocs } = await payload.find({
    collection: 'products',
    where: { id: { not_equals: id } },
    limit: 6,
  })

  const formattedOtherProducts = otherProductDocs.map((doc: any) => {
    const docImages = Array.isArray(doc.images)
      ? doc.images
          .map((img: any) =>
            typeof img.image === 'object' && img.image?.url ? img.image.url : img.image,
          )
          .filter(Boolean)
      : []

    return {
      id: doc.id,
      title: doc.title,
      price: doc.price,
      comparePrice: doc.comparePrice,
      description: doc.description,
      stock: doc.stock ?? 0,
      category: doc.category,
      images: docImages,
    }
  })

  return (
    <ProductDetailClient
      product={formattedProduct}
      otherProducts={formattedOtherProducts}
    />
  )
}

