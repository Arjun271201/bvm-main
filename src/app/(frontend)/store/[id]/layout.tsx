import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function ProductLayout({ children }: { children: React.ReactNode }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepage = await payload.findGlobal({ slug: 'homepage' })
  const firstSlide = homepage?.heroSlides?.[0]
  const bgImage =
    typeof firstSlide?.backgroundImage === 'object' && firstSlide?.backgroundImage?.url
      ? firstSlide.backgroundImage.url
      : firstSlide?.backgroundImage

  return (
    <div className="relative">
      {/* Full page fixed background - -z-10 so it never covers Footer/Header */}
      {bgImage && (
        <div
          className="fixed inset-0 -z-5 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="fixed inset-0 -z-5 bg-black/80" />

      {/* Content */}
      <div className="relative min-h-[100vh]">{children}</div>
    </div>
  )
}
