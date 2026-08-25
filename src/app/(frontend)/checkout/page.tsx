'use client'

import React, { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'

export default function CheckoutPage() {
  const { items, total, clearCart, loaded } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      // 1. Backend la order create pannuvom (amount, currency)
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, name, email, phone, address }),
      })
      const data = await res.json()

      // 2. Razorpay checkout open pannuvom
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'Bhakti Vedanta Media',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: async function (response: any) {
          // 3. Payment success ah verify pannuvom
          await fetch('/api/checkout/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, orderRecordId: data.orderRecordId }),
          })
          clearCart()
          window.location.href = '/order-success'
        },
        prefill: { name, email, contact: phone },
        theme: { color: '#8a5cb0' },
      }

      // @ts-ignore - Razorpay script window la load aagirukanum
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!loaded) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-8 text-center text-white">
        <p>Loading cart...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-8 text-center text-white">
        <p>Your cart is empty.</p>
        <a href="/" className="text-yellow-400 underline">
          Go back home
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-8 text-white">
      <h1 className="text-2xl font-semibold mb-8">User Details</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.title} x{item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <input
          className="w-full bg-stone-900 border border-white/10 rounded-lg px-4 py-3 text-sm"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full bg-stone-900 border border-white/10 rounded-lg px-4 py-3 text-sm"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full bg-stone-900 border border-white/10 rounded-lg px-4 py-3 text-sm"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="w-full bg-stone-900 border border-white/10 rounded-lg px-4 py-3 text-sm"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || !name || !email || !phone}
        className="w-full bg-gradient-to-r from-purple-400 to-yellow-100 text-stone-900 font-medium py-3 rounded-full disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay ₹${total}`}
      </button>
    </div>
  )
}
