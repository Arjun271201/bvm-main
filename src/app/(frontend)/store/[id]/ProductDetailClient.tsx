'use client'

import React, { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'

type ProductItem = {
  id: string
  title: string
  price: number
  comparePrice?: number
  description?: string
  stock: number
  category?: any
  images?: string[]
}

type Props = {
  product: ProductItem
  otherProducts: ProductItem[]
}

export default function ProductDetailClient({ product, otherProducts }: Props) {
  const { addItem, setIsOpen } = useCart()

  // Dynamic gallery images with fallbacks if needed
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['/placeholder.jpg']

  // Ensure we have at least 4 image slots for gallery thumbnail showcase
  const galleryThumbnails = images.length >= 4 
    ? images.slice(0, 4) 
    : [...images, ...Array(4 - images.length).fill(images[0])]

  const [selectedImage, setSelectedImage] = useState(images[0])
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description')

  // Calculate discount percentage if comparePrice exists
  const discountPercent = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 26

  const comparePriceVal = product.comparePrice || Math.round(product.price * 1.35)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: selectedImage,
      })
    }
    setIsOpen(true)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    window.location.href = '/checkout'
  }

  return (
    <div className="min-h-screen bg-[#2c0002] text-stone-200 pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Product Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Gallery Images (Compact & Centered) */}
          <div className="lg:col-span-5 space-y-3 max-w-[340px] sm:max-w-[360px] w-full mx-auto lg:mx-0">
            {/* Active Display Image */}
            <div className="relative aspect-[4/5] max-h-[360px] w-full rounded-2xl bg-stone-900/90 border border-stone-800 overflow-hidden shadow-xl flex items-center justify-center group">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Discount Tag on image */}
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow backdrop-blur-sm">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-2">
              {galleryThumbnails.map((img, idx) => {
                const isActive = selectedImage === img
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-lg overflow-hidden bg-stone-900 border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105 shadow-md shadow-amber-500/10'
                        : 'border-stone-800 hover:border-stone-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              {/* Category Tag */}
              <div className="inline-block bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-2">
                {product.category?.name || 'Bhagavad Gita'}
              </div>

              {/* Title & Author */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight leading-tight mb-1 font-serif">
                {product.title}
              </h1>
              <p className="text-stone-400 text-xs font-medium mb-3">
                By A.C. Bhaktivedanta Swami Prabhupada
              </p>

              {/* Rating & Bestseller row */}
              <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                <div className="flex items-center text-amber-400 gap-1 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-stone-300 font-semibold text-[11px] ml-1">
                    4.8 <span className="text-stone-500">(124 reviews)</span>
                  </span>
                </div>
                <span className="bg-amber-950/80 border border-amber-700/60 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Bestseller
                </span>
              </div>

              {/* Price section */}
              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="text-2xl font-extrabold text-amber-400 tracking-tight">
                  ₹{product.price}
                </span>
                {comparePriceVal && (
                  <span className="text-stone-500 line-through text-sm font-normal">
                    ₹{comparePriceVal}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] font-bold px-2 py-0.5 rounded">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-1.5 mb-5 text-xs font-semibold">
                <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                {product.stock > 0 ? (
                  <span className="text-emerald-400">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </div>

              {/* Options Row: Language & Quantity */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="block text-[11px] font-medium text-stone-400 mb-1">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full h-[42px] bg-stone-900 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 focus:outline-none focus:border-amber-500/60 transition-colors cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Sanskrit">Sanskrit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-400 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center justify-between h-[42px] bg-stone-900 border border-stone-800 text-stone-200 rounded-xl px-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-stone-100">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 rounded transition-colors cursor-pointer text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mb-5">
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    disabled={product.stock <= 0}
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#853516] hover:bg-[#9a3e1b] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-[48px] h-[48px] rounded-xl border transition-all cursor-pointer flex items-center justify-center flex-shrink-0 ${
                      isWishlisted
                        ? 'border-red-500/50 bg-red-500/10 text-red-400'
                        : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-amber-400 hover:border-stone-700'
                    }`}
                    title="Wishlist"
                  >
                    <svg className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  disabled={product.stock <= 0}
                  onClick={handleBuyNow}
                  className="w-full bg-[#9a3e1b] hover:bg-[#b4481e] text-white font-bold py-3 text-sm rounded-xl transition-all shadow-md tracking-wide text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Guarantee Banner */}
              <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl py-2.5 px-4 flex items-center justify-around gap-2 text-xs font-medium text-stone-300">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[11px]">Free shipping above ₹500</span>
                </div>
                <div className="w-px h-3 bg-stone-800" />
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-[11px]">7-day return policy</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Tabbed Info Section (Description / Book Details / Reviews) */}
        <div className="mt-16 border-t border-stone-800/80 pt-10">
          <div className="flex border-b border-stone-800 gap-8 text-sm font-semibold mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'description'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'details'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Book Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-amber-400 font-bold border-b-2 border-amber-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Reviews (124)
            </button>
          </div>

          <div className="text-stone-300 text-sm leading-relaxed max-w-4xl">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>
                  {product.description ||
                    'The Bhagavad-gita is universally renowned as the jewel of India’s spiritual wisdom. Spoken by Lord Krishna, the Supreme Personality of Godhead to His intimate disciple Arjuna, the Gita’s seven hundred concise verses provide a definitive guide to the science of self-realization. No other philosophical or religious work reveals, in such a lucid and profound way, the nature of consciousness, the self, the universe and the Supreme.'}
                </p>
                <p>
                  This edition includes the original Sanskrit verses, transliteration, word-for-word meaning, and detailed English translation with purport by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-900/40 p-6 rounded-2xl border border-stone-800">
                <div>
                  <span className="text-stone-500 text-xs block">Publisher</span>
                  <span className="font-semibold text-stone-200">The Bhaktivedanta Book Trust</span>
                </div>
                <div>
                  <span className="text-stone-500 text-xs block">Author</span>
                  <span className="font-semibold text-stone-200">A.C. Bhaktivedanta Swami Prabhupada</span>
                </div>
                <div>
                  <span className="text-stone-500 text-xs block">Language</span>
                  <span className="font-semibold text-stone-200">{selectedLanguage}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-xs block">Binding</span>
                  <span className="font-semibold text-stone-200">Hardcover</span>
                </div>
                <div>
                  <span className="text-stone-500 text-xs block">Pages</span>
                  <span className="font-semibold text-stone-200">924 Pages</span>
                </div>
                <div>
                  <span className="text-stone-500 text-xs block">ISBN</span>
                  <span className="font-semibold text-stone-200">978-93-84564-00-1</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-stone-900/40 p-6 rounded-2xl border border-stone-800">
                  <div className="text-center">
                    <span className="text-4xl font-extrabold text-amber-400 block">4.8</span>
                    <span className="text-xs text-stone-400">out of 5</span>
                  </div>
                  <div className="h-10 w-px bg-stone-800" />
                  <div>
                    <div className="flex text-amber-400 gap-1 text-sm mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-stone-400">Based on 124 verified reader reviews</p>
                  </div>
                </div>

                {/* Sample Review */}
                <div className="bg-stone-900/30 p-4 rounded-xl border border-stone-800/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-200 text-xs">Ramesh K.</span>
                    <span className="text-[11px] text-stone-500">2 days ago</span>
                  </div>
                  <div className="flex text-amber-400 gap-0.5 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-stone-300">
                    Extremely well bound book with beautiful purports. A priceless spiritual treasure!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like Section (Compact Grid) */}
        {otherProducts.length > 0 && (
          <div className="mt-16 border-t border-stone-800/80 pt-10">
            <h2 className="text-xl font-bold font-serif text-stone-100 mb-6">
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {otherProducts.map((item) => {
                const itemImg = item.images?.[0] || '/placeholder.jpg'
                return (
                  <div
                    key={item.id}
                    className="bg-stone-900/70 border border-stone-800 rounded-xl p-3 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group shadow-md"
                  >
                    <div>
                      {/* Compact Product Image Frame (100% Uniform Size) */}
                      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-800/80 mb-2.5 border border-stone-800">
                        <a href={`/store/${item.id}`} className="block w-full h-full">
                          <img
                            src={itemImg}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </a>
                        {item.stock <= 0 && (
                          <span className="absolute top-2 right-2 z-10 bg-red-900/90 text-red-200 text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Compact Item Details */}
                      <a href={`/store/${item.id}`} className="block">
                        <h3 className="text-xs font-bold text-stone-100 line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 mb-2">
                          A.C. Bhaktivedanta Swami...
                        </p>
                      </a>
                    </div>

                    {/* Card Footer: Price & Quick Add Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-800/60 mt-1">
                      <span className="text-sm font-extrabold text-amber-400">
                        ₹{item.price}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            image: itemImg,
                          })
                        }
                        className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 transition-all cursor-pointer"
                        title="Add to Cart"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
