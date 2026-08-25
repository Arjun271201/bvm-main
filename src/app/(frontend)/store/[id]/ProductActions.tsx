'use client'

import React, { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'

type Props = {
  id: string
  title: string
  price: number
  image?: string
  inStock: boolean
}

export default function ProductActions({ id, title, price, image, inStock }: Props) {
  const { addItem, setIsOpen } = useCart()
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id, title, price, image })
    }
    setIsOpen(true)
  }

  const handleBuyNow = () => {
    handleAdd()
    window.location.href = '/checkout'
  }

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full bg-stone-800 text-stone-500 font-medium py-3 rounded-full cursor-not-allowed"
      >
        Out of Stock
      </button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-stone-400">Qty</span>
        <div className="flex items-center gap-3 bg-stone-900 rounded-full px-3 py-1.5">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="text-white/80 hover:text-white"
          >
            -
          </button>
          <span className="w-5 text-center">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="text-white/80 hover:text-white">
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 border border-yellow-500/40 text-white font-medium py-3 rounded-full hover:bg-yellow-500/10"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-gradient-to-r from-purple-400 to-yellow-100 text-stone-900 font-medium py-3 rounded-full hover:opacity-90"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
