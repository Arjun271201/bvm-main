'use client'

import React from 'react'
import { useCart } from './cart/CartContext'

type Props = {
  id: string
  title: string
  price: number
  image?: string
}

export default function BookCard({ id, title, price, image }: Props) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem({ id, title, price, image })}
      className="w-full flex items-center justify-center gap-2 bg-[#FFE7C3] text-[#512D26] text-sm font-semibold py-2 rounded-full hover:bg-[#f7d89b] transition-colors"
    >
      Buy Now
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    </button>
  )
}
