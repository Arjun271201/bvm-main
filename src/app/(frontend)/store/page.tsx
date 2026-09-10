import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import StoreClient from './StoreClient'

export default async function StorePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: productsDocs } = await payload.find({
    collection: 'products',
    limit: 100,
  })

  const { docs: categoriesDocs } = await payload.find({
    collection: 'categories',
    limit: 50,
  })

  const formattedProducts = productsDocs.map((doc: any) => {
    const images = Array.isArray(doc.images)
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
      images: images,
    }
  })

  return <StoreClient products={formattedProducts} categories={categoriesDocs} />
}
