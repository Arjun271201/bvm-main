'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from './cart/CartContext'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Videos', href: '/videos' },
  { label: 'Song', href: '/songs' },
  { label: 'Store', href: '/store' },
  { label: 'Courses', href: '/courses' },
  { label: 'Interactive', href: '/interactive' },
  { label: 'Download', href: '/downloads' },
  { label: 'Support', href: '/support' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const { count, setIsOpen } = useCart()

  return (
    <div className="sticky top-0 z-50 relative">
      <header className="bg-black border-b border-yellow-500/15">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-bold tracking-wide bg-gradient-to-br from-yellow-500 to-purple-500 bg-clip-text text-transparent">
              BVM
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-100/85 text-[0.92rem] hover:text-yellow-500 hover:opacity-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3.5">
            <button aria-label="Search" className="text-stone-100/85 hover:text-yellow-500 p-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button aria-label="Account" className="text-stone-100/85 hover:text-yellow-500 p-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </button>
            <button
              aria-label="Language"
              className="text-stone-100/85 hover:text-yellow-500 flex items-center gap-0.5 text-sm p-1"
            >
              <span>A</span>
              <span className="opacity-60 text-xs">அ</span>
            </button>

            {/* Cart */}
            <button
              aria-label="Cart"
              onClick={() => setIsOpen(true)}
              className="relative text-stone-100/85 hover:text-yellow-500 p-1"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-stone-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              aria-label="Menu"
              className="md:hidden text-stone-100/85 hover:text-yellow-500 p-1"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden flex flex-col gap-1 px-8 pt-2 pb-5 border-t border-yellow-500/10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-100/85 py-2.5 hover:text-yellow-500"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className="absolute left-0 top-full z-40 w-full px-8 py-2">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go to previous page"
            className="flex items-center rounded-md px-2 py-1 text-xs text-stone-300 hover:bg-white/10 hover:text-yellow-400 transition-colors"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={() => router.forward()}
            aria-label="Go to next page"
            className="flex items-center rounded-md px-2 py-1 text-xs text-stone-300 hover:bg-white/10 hover:text-yellow-400 transition-colors"
          >
            <span aria-hidden="true" className="text-base leading-none">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
