import React from 'react'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Full page fixed background image - temple congregation */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/media/checkout-bg.jpg")` }}
      />
      {/* Overlay for text readability */}
      <div className="fixed inset-0 -z-10 bg-[#2c0002]/70 backdrop-blur-[1px]" />

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
