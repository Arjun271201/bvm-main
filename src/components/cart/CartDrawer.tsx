'use client'

import React from 'react'
import { useCart } from './CartContext'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, clearCart } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-stone-950 text-white flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold">Your Cart ({items.length})</h3>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && <p className="text-stone-400 text-sm">Your cart is empty.</p>}

          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-stone-400 text-xs">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700"
                  >
                    -
                  </button>
                  <span className="text-sm w-5 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                aria-label="Remove"
                className="text-stone-500 hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-white/10">
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-stone-300">Total</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <a
              href="/checkout"
              className="block text-center w-full bg-gradient-to-r from-purple-400 to-yellow-100 text-stone-900 font-medium py-3 rounded-full hover:opacity-90"
            >
              Checkout
            </a>
            <button
              onClick={clearCart}
              className="w-full text-stone-400 text-xs mt-3 hover:text-white"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
