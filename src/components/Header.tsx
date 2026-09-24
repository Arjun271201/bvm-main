'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Sun } from 'lucide-react'
import { useCart } from './cart/CartContext'
import { useBreadcrumb } from './BreadcrumbContext'

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
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { count, setIsOpen } = useCart()
  const { breadcrumbs: customBreadcrumbs } = useBreadcrumb()

  return (
    <div className="sticky top-0 z-50 relative w-full bg-[#2c0002]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <header className="bg-transparent">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-bold tracking-wide bg-gradient-to-br from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              BVM
            </span>
          </Link>

          {/* Desktop nav (xl screens >= 1280px) */}
          <nav className="hidden xl:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-100/85 text-xs font-medium uppercase tracking-wide hover:text-yellow-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              suppressHydrationWarning
              className="text-stone-100/85 hover:text-yellow-500 p-1 cursor-pointer"
            >
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
            <button
              aria-label="Account"
              suppressHydrationWarning
              className="text-stone-100/85 hover:text-yellow-500 p-1 cursor-pointer"
            >
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
              suppressHydrationWarning
              className="text-stone-100/85 hover:text-yellow-500 flex items-center gap-0.5 text-sm p-1 cursor-pointer"
            >
              <span>A</span>
              <span className="opacity-60 text-xs">அ</span>
            </button>
            <button
              type="button"
              aria-label="Switch to light theme"
              suppressHydrationWarning
              onClick={() => router.push('/light')}
              className="text-stone-100/85 hover:text-yellow-500 p-1 cursor-pointer"
            >
              <Sun size={18} aria-hidden="true" />
            </button>

            {/* Cart */}
            <button
              aria-label="Cart"
              suppressHydrationWarning
              onClick={() => setIsOpen(true)}
              className="relative text-stone-100/85 hover:text-yellow-500 p-1 cursor-pointer"
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

            {/* Mobile & Tablet Hamburger menu toggle (< 1280px) */}
            <button
              aria-label="Toggle Menu"
              suppressHydrationWarning
              className="xl:hidden text-stone-200 hover:text-yellow-400 p-1.5 rounded-lg border border-stone-800 bg-[#2c0002]/80 cursor-pointer transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Tablet & Mobile Dropdown Nav */}
        {mobileOpen && (
          <nav className="xl:hidden bg-[#2c0002]/95 backdrop-blur-md border-t border-stone-800 px-6 py-4 flex flex-col gap-1.5 shadow-2xl">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-200 hover:text-yellow-400 py-2 px-3 rounded-lg hover:bg-stone-900/60 text-sm font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Navigation Sub-Bar with Breadcrumb Tabs on Inner Pages */}
      <div
        className={
          isHomePage
            ? 'absolute top-[100%] left-0 w-full px-4 sm:px-6 lg:px-8 py-2 pointer-events-none z-10 bg-transparent'
            : 'w-full px-4 sm:px-6 lg:px-8 py-2 bg-transparent'
        }
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => router.back()}
              aria-label="Go to previous page"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3a0a0a]/90 hover:bg-[#4d0d0d] text-amber-500/90 hover:text-yellow-400 border border-amber-800/50 shadow-md backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => router.forward()}
              aria-label="Go to next page"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3a0a0a]/90 hover:bg-[#4d0d0d] text-amber-500/90 hover:text-yellow-400 border border-amber-800/50 shadow-md backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>

            {/* Dynamic Breadcrumb Tab for Inner Pages */}
            {!isHomePage && (
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500/90 pl-2">
                <Link href="/" className="hover:text-yellow-400 transition-colors [text-shadow:0_0_1px_#1a0001,0_0_2px_#1a0001]">
                  HOME
                </Link>
                {customBreadcrumbs
                  ? customBreadcrumbs.map((item, idx) => (
                      <React.Fragment key={item.label + idx}>
                        <span className="text-stone-500">/</span>
                        {item.href ? (
                          <Link
                            href={item.href}
                            className={`hover:text-yellow-400 transition-colors [text-shadow:0_0_1px_#1a0001,0_0_2px_#1a0001] ${
                              idx === customBreadcrumbs.length - 1 ? 'text-amber-400 font-bold' : ''
                            }`}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span
                            className={`[text-shadow:0_0_1px_#1a0001,0_0_2px_#1a0001] ${
                              idx === customBreadcrumbs.length - 1 ? 'text-amber-400 font-bold' : ''
                            }`}
                          >
                            {item.label}
                          </span>
                        )}
                      </React.Fragment>
                    ))
                  : pathname
                      .split('/')
                      .filter(Boolean)
                      .filter((segment) => segment.toLowerCase() !== 'language')
                      .map((segment, idx, arr) => {
                        // Label map: rename URL segments to friendly names
                        const labelMap: Record<string, string> = {
                          songs: 'SONG LIBRARY',
                          videos: 'VIDEO LIBRARY',
                          store: 'STORE',
                          courses: 'COURSES',
                          downloads: 'DOWNLOADS',
                          support: 'SUPPORT',
                          about: 'ABOUT',
                          interactive: 'INTERACTIVE',
                        }
                        let displayText =
                          labelMap[segment.toLowerCase()] ||
                          decodeURIComponent(segment).replace(/-/g, ' ').toUpperCase()

                        // Replace numeric or long ID segments with 'DETAILS'
                        if (/^\d+$/.test(segment) || (segment.length > 20 && /^[a-f0-9-]+$/i.test(segment))) {
                          displayText = 'DETAILS'
                        }

                        return (
                          <React.Fragment key={segment + idx}>
                            <span className="text-stone-500">/</span>
                            <Link
                              href={`/${arr.slice(0, idx + 1).join('/')}`}
                              className={`hover:text-yellow-400 transition-colors [text-shadow:0_0_1px_#1a0001,0_0_2px_#1a0001] ${
                                idx === arr.length - 1 ? 'text-amber-400 font-bold' : ''
                              }`}
                            >
                              {displayText}
                            </Link>
                          </React.Fragment>
                        )
                      })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
