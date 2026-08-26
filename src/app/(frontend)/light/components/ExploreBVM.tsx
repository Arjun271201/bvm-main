import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

const icons: Record<string, string> = {
  play: '▶',
  music: '♪',
  book: '▤',
  cart: '🛒',
  download: '↓',
  heart: '♥',
}

export default async function ExploreBVM() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 12,
  })

  if (!categories.length) return null

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-12 bg-[#FBF3E8]">
      <h2 className="text-[#241711] text-2xl font-semibold mb-6">Explore BVM</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category: any) => {
          const imageUrl =
            typeof category.image === 'object' && category.image?.url
              ? category.image.url
              : category.image

          return (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#2B1A12]"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl text-white">
                {icons[category.icon] || null}
              </div>
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8 text-center text-sm font-medium text-white">
                {category.title}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
