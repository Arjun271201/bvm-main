import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getSiteVersion(): Promise<number> {
  const payload = await getPayload({
    config: configPromise,
  })

  const timestamps: number[] = []

  // 1. Homepage global
  try {
    const homepage = await payload.findGlobal({ slug: 'homepage' })
    if (homepage?.updatedAt) {
      timestamps.push(new Date(homepage.updatedAt).getTime())
    }
  } catch (e) {}

  // 2. Collections
  const collections = ['videos', 'songs', 'products', 'courses', 'testimonials']
  await Promise.all(
    collections.map(async (col) => {
      try {
        const res = await payload.find({
          collection: col as any,
          limit: 1,
          sort: '-updatedAt',
          select: { updatedAt: true },
        })
        const doc = res.docs?.[0] as any
        if (doc?.updatedAt) {
          timestamps.push(new Date(doc.updatedAt).getTime())
        }
      } catch (e) {}
    })
  )

  return timestamps.length > 0 ? Math.max(...timestamps) : 0
}
