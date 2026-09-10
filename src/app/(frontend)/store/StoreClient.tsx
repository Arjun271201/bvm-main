'use client'

import React, { useState, useMemo } from 'react'
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
  products: ProductItem[]
  categories?: any[]
}

const CATEGORY_CARDS = [
  { id: 'all', name: 'Books', count: 120, icon: '📚' },
  { id: 'bhagavad-gita', name: 'Bhagavad Gita', count: 45, icon: '📜' },
  { id: 'srimad-bhagavatam', name: 'Srimad Bhagavatam', count: 120, icon: '📖' },
  { id: 'teaching', name: 'Teaching Materials', count: 15, icon: '🎓' },
  { id: 'festival', name: 'Festival Items', count: 30, icon: '🪔' },
  { id: 'posters', name: 'Posters', count: 65, icon: '🖼️' },
  { id: 'devotional', name: 'Devotional Items', count: 55, icon: '📿' },
  { id: 'digital', name: 'Digital Books', count: 0, icon: '📱', tag: 'SOON' },
]

export default function StoreClient({ products }: Props) {
  const { addItem, setIsOpen } = useCart()

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all')
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  // Active filters list for filter pills bar
  const activeFilters = useMemo(() => {
    const filters: { id: string; label: string; clear: () => void }[] = []
    if (activeCategory !== 'all') {
      const catObj = CATEGORY_CARDS.find((c) => c.id === activeCategory)
      filters.push({
        id: 'cat',
        label: catObj ? catObj.name : activeCategory,
        clear: () => setActiveCategory('all'),
      })
    }
    if (selectedPriceRange !== 'all') {
      filters.push({
        id: 'price',
        label: selectedPriceRange === '0-500' ? '₹0 - ₹500' : '₹500 - ₹2,500',
        clear: () => setSelectedPriceRange('all'),
      })
    }
    if (selectedAvailability !== 'all') {
      filters.push({
        id: 'stock',
        label: selectedAvailability === 'in-stock' ? 'In Stock' : 'Out of Stock',
        clear: () => setSelectedAvailability('all'),
      })
    }
    if (selectedLanguage !== 'all') {
      filters.push({
        id: 'lang',
        label: selectedLanguage,
        clear: () => setSelectedLanguage('all'),
      })
    }
    return filters
  }, [activeCategory, selectedPriceRange, selectedAvailability, selectedLanguage])

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== 'all') {
        const catName = p.category?.name?.toLowerCase() || ''
        const catSlug = p.category?.slug?.toLowerCase() || ''
        if (
          !catName.includes(activeCategory.replace('-', ' ')) &&
          !catSlug.includes(activeCategory)
        ) {
          // Keep showing if title matches keyword or fall back to show
        }
      }
      if (selectedAvailability === 'in-stock' && p.stock <= 0) return false
      if (selectedAvailability === 'out-stock' && p.stock > 0) return false
      if (selectedPriceRange === '0-500' && p.price > 500) return false
      if (selectedPriceRange === '500-2500' && (p.price < 500 || p.price > 2500)) return false
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [products, activeCategory, selectedAvailability, selectedPriceRange, searchQuery])

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const clearAllFilters = () => {
    setActiveCategory('all')
    setSelectedPriceRange('all')
    setSelectedAvailability('all')
    setSelectedLanguage('all')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-[#2c0002] text-stone-200 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-[#3d0003] via-[#2c0002] to-[#2c0002] border-b border-red-950/80 pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Ambient Glow & Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl">
            {/* Tag */}
            <div className="inline-block bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
              DEVOTIONAL COLLECTION 2026
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-100 font-serif mb-4 tracking-tight">
              Book Store
            </h1>

            {/* Subtitle */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              Explore our curated collection of Vedic scriptures, devotional literature, teaching
              materials, and spiritual resources for your journey inward.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-10">
              <a
                href="#products-grid"
                className="bg-[#9a3e1b] hover:bg-[#b4481e] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-950/40 cursor-pointer"
              >
                Browse Books
              </a>
              <a
                href="#products-grid"
                className="border border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 font-medium py-2.5 px-6 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Shop Now
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-800/80 max-w-lg">
              <div>
                <span className="text-2xl font-extrabold text-amber-400 block font-serif">1,200+</span>
                <span className="text-xs text-stone-400">Titles</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-amber-400 block font-serif">40+</span>
                <span className="text-xs text-stone-400">Languages</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-amber-400 block font-serif">Free</span>
                <span className="text-xs text-stone-400">Shipping ₹500+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* 2. Browse By Category Section */}
        <section className="mb-12">
          <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
            BROWSE BY CATEGORY
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORY_CARDS.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                    isActive
                      ? 'border-amber-500 bg-amber-950/30 text-amber-300 ring-2 ring-amber-500/20 shadow-md'
                      : 'border-stone-800 bg-stone-900/80 hover:border-stone-700 text-stone-300 hover:text-white'
                  }`}
                >
                  <span className="text-2xl mb-1.5">{cat.icon}</span>
                  <span className="text-xs font-bold line-clamp-1">{cat.name}</span>
                  <span className="text-[10px] text-stone-400 mt-0.5">
                    {cat.tag ? (
                      <span className="bg-amber-500/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                        {cat.tag}
                      </span>
                    ) : (
                      `${cat.count} items`
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* 3. Products Section & Controls */}
        <section id="products-grid" className="space-y-6">
          
          {/* Header Row: All Products & Grid Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
            <div>
              <h2 className="text-2xl font-bold font-serif text-stone-100">All Products</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Showing 1-{filteredProducts.length} of {products.length} results
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Layout Switcher */}
              <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Grid View"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="List View"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Items Per Page Select */}
              <select className="bg-stone-900 border border-stone-800 text-stone-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500/60 cursor-pointer">
                <option value="8">Show 8 per page</option>
                <option value="16">Show 16 per page</option>
                <option value="24">Show 24 per page</option>
              </select>
            </div>
          </div>

          {/* Filter Bar (Category, Price, Stock, Language, Sort) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/60 border border-stone-800/80 p-3 rounded-xl">
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter */}
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500/60 cursor-pointer"
              >
                <option value="all">Category: All</option>
                <option value="bhagavad-gita">Bhagavad Gita</option>
                <option value="srimad-bhagavatam">Srimad Bhagavatam</option>
                <option value="teaching">Teaching Materials</option>
                <option value="festival">Festival Items</option>
                <option value="posters">Posters</option>
              </select>

              {/* Price Range Filter */}
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500/60 cursor-pointer"
              >
                <option value="all">Price: All</option>
                <option value="0-500">₹0 - ₹500</option>
                <option value="500-2500">₹500 - ₹2,500</option>
              </select>

              {/* Availability Filter */}
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500/60 cursor-pointer"
              >
                <option value="all">Availability: All</option>
                <option value="in-stock">In Stock</option>
                <option value="out-stock">Out of Stock</option>
              </select>

              {/* Language Filter */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500/60 cursor-pointer"
              >
                <option value="all">Language: All</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Hindi">Hindi</option>
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500/60 cursor-pointer"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              {activeFilters.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-stone-400 hover:text-amber-400 text-xs underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                className="bg-[#9a3e1b] hover:bg-[#b4481e] text-white text-xs font-bold py-1.5 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {activeFilters.map((f) => (
                <span
                  key={f.id}
                  className="inline-flex items-center gap-1.5 bg-stone-900 border border-stone-800 text-stone-300 text-xs px-2.5 py-1 rounded-full"
                >
                  <span>{f.label}</span>
                  <button
                    type="button"
                    onClick={f.clear}
                    className="text-stone-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* 4. Compact Product Cards Grid (5 Cards Per Row) */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-stone-400 bg-stone-900/30 rounded-2xl border border-stone-800">
              <p className="text-lg font-bold mb-2">No products found matching your filters.</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-amber-400 underline text-sm cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
              {filteredProducts.map((p) => {
                const mainImg = p.images?.[0] || '/placeholder.jpg'
                const isLiked = wishlist[p.id] || false
                const comparePriceVal = p.comparePrice || Math.round(p.price * 1.35)

                return (
                  <div
                    key={p.id}
                    className="bg-stone-900/70 border border-stone-800 rounded-xl p-3 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group shadow-md"
                  >
                    <div>
                      {/* Uniform Image Frame (100% Same Size for All Cards) */}
                      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-800/80 mb-2.5 border border-stone-800">
                        <a href={`/store/${p.id}`} className="block w-full h-full">
                          <img
                            src={mainImg}
                            alt={p.title}
                            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </a>

                        {/* Top-Left Badge */}
                        <span className="absolute top-2 left-2 z-10 bg-amber-950/90 border border-amber-700/80 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow backdrop-blur-sm">
                          {p.stock > 0 ? 'Bestseller' : 'Out of Stock'}
                        </span>

                        {/* Top-Right Wishlist Heart */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(p.id)}
                          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow backdrop-blur-sm ${
                            isLiked
                              ? 'bg-red-500/20 border-red-500/50 text-red-400'
                              : 'bg-stone-900/90 border-stone-800 text-stone-400 hover:text-amber-400'
                          }`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill={isLiked ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Product Metadata */}
                      <a href={`/store/${p.id}`} className="block space-y-0.5">
                        <h3 className="text-xs font-bold text-stone-100 line-clamp-1 group-hover:text-amber-400 transition-colors font-serif">
                          {p.title}
                        </h3>
                        <p className="text-[11px] text-stone-400 line-clamp-1 font-medium">
                          A.C. Bhaktivedanta Swami Prabhupada
                        </p>
                        <p className="text-[11px] text-stone-400 line-clamp-1 leading-normal pt-0.5">
                          {p.description ||
                            'The complete authorized translation with original Sanskrit.'}
                        </p>
                      </a>

                      {/* Category Tag & Rating */}
                      <div className="flex items-center justify-between pt-2 pb-0.5 text-[10px]">
                        <span className="bg-stone-800 text-stone-300 text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase">
                          Scripture
                        </span>
                        <div className="flex items-center text-amber-400 gap-0.5 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                          <span className="text-stone-400 text-[9px] ml-0.5">(128)</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Add to Cart Button */}
                    <div className="pt-2 border-t border-stone-800/80 mt-1 space-y-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold text-amber-400">
                          ₹{p.price}
                        </span>
                        {comparePriceVal && (
                          <span className="text-stone-500 line-through text-[11px]">
                            ₹{comparePriceVal}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        disabled={p.stock <= 0}
                        onClick={() => {
                          addItem({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            image: mainImg,
                          })
                          setIsOpen(true)
                        }}
                        className="w-full bg-[#853516] hover:bg-[#9a3e1b] text-white font-bold py-2 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                          />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
