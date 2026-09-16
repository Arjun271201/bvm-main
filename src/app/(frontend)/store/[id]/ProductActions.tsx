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
          className="flex-1 border border-[#FFE7C3] text-[#FFE7C3] font-semibold py-3 rounded-full hover:bg-[#FFE7C3] hover:text-[#512D26] transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[#FFE7C3] text-[#512D26] font-semibold py-3 rounded-full hover:bg-[#f7d89b] transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
