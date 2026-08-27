import React from 'react'
import { Music2 } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Category icon ku matching small SVG icons
const ICONS: Record<string, React.ReactNode> = {
  play: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  music: <Music2 size={26} strokeWidth={2.25} aria-hidden="true" />,
  book: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  cart: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  download: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-6.7-4.35-9.33-8.2C.9 10.1 1.6 6.6 4.5 5.1 6.6 4 9 4.6 12 7.5 15 4.6 17.4 4 19.5 5.1c2.9 1.5 3.6 5 1.83 7.7C18.7 16.65 12 21 12 21z" />
    </svg>
  ),
}

export default async function ExploreBVM({ heading = 'Explore BVM' }: { heading?: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 12,
  })

  if (!categories.length) return null

  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-white text-2xl font-semibold mb-6">{heading}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat: any) => {
            const imageUrl =
              typeof cat.image === 'object' && cat.image?.url ? cat.image.url : cat.image

            return (
              <a
                key={cat.id}
                href={`/${cat.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-stone-800"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {ICONS[cat.icon] ?? null}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-black/65 px-3 py-2 text-center text-sm font-medium text-white">
                  {cat.title}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
