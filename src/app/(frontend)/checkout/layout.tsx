import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function CheckoutLayout({ children }: { children: React.ReactNode }) {
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
      {/* Full page fixed background - z-[-1] so it never covers Footer/Header */}
      {bgImage && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="fixed inset-0 -z-10 bg-black/80" />

      {/* Content */}
      <div className="relative min-h-[70vh]">
        <div className="text-center pt-10 pb-4">
          <h1 className="text-white text-3xl font-serif font-semibold">Checkout</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
