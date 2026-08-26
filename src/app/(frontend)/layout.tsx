import React from 'react'
import './styles.css'
import { CartProvider } from '@/components/cart/CartContext'
import CartDrawer from '@/components/cart/CartDrawer'
import FrontendChrome from '@/components/FrontendChrome'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
        <CartProvider>
          <FrontendChrome>{children}</FrontendChrome>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
