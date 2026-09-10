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
    <div className="relative min-h-screen bg-[#2c0002] p-10">
      {/* Full page fixed background stays behind the checkout content. */}
      {bgImage && (
        <div
          className="fixed inset-0 -z-10 p-5 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="fixed inset-0 -z-5 bg-[#2c0002]/95" />

      {/* Content */}
      <div className="relative z-10 min-h-[100vh]">
        <div className="text-center pt-10 pb-4">
          <h1 className="text-white text-3xl font-serif font-semibold">Checkout</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
