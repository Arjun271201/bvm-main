import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function TestimonialsSection({
  heading = 'Testimonial',
}: {
  heading?: string
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    limit: 8,
  })

  if (!testimonials.length) return null

  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="text-white text-2xl font-semibold mb-2">{heading}</h2>
        <p className="text-stone-400 mb-8">
          Hear how Bhakti Vedanta Media inspires learning, devotion, and spiritual growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-left">
          {testimonials.map((t: any) => {
            const photoUrl = typeof t.photo === 'object' && t.photo?.url ? t.photo.url : t.photo

            return (
              <div key={t.id} className="relative rounded-xl overflow-hidden aspect-[3/4]">
                {photoUrl && (
                  <img
                    src={photoUrl}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    {t.location && <p className="text-stone-300 text-xs">{t.location}</p>}
                    <p className="text-stone-100 text-sm mt-3 leading-relaxed line-clamp-5">
                      "{t.message}"
                    </p>
                  </div>
                  <div className="bg-white rounded-full px-3 py-1 inline-flex w-fit gap-0.5 mt-4">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
