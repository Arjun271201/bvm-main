'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Moon, ShoppingCart } from 'lucide-react'
import { useCart } from '../../../../components/cart/CartContext'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Videos', href: '/videos' },
  { label: 'Songs Library', href: '/songs' },
  { label: 'Book Store', href: '/store' },
  { label: 'Courses', href: '/courses' },
  { label: 'Interactive Learning', href: '/interactive' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Support BVM', href: '/support' },
  { label: 'About BVM', href: '/about' },
]

export default function Header() {
  const router = useRouter()
  const { count, setIsOpen } = useCart()

  return (
    <header className="w-full bg-[#FBF3E8] border-b border-[#EEE1D0]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#2B1A12] flex items-center justify-center">
            <span className="text-[#D9784A] text-lg leading-none">✦</span>
          </div>
          <span className="text-[#241711] font-semibold text-[17px]">Bhakti Vedanta Media</span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm ${
                i === 0
                  ? 'text-[#241711] border-b-2 border-[#D9784A] pb-1'
                  : 'text-[#5C4E42] hover:text-[#241711]'
              } transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4 text-[#241711]">
          <button aria-label="Search" className="hover:text-[#D9784A] transition-colors">
            🔍
          </button>
          <button aria-label="Language" className="hover:text-[#D9784A] transition-colors text-sm">
            EN
          </button>
          <button
            type="button"
            aria-label="Switch to dark theme"
            onClick={() => router.push('/')}
            className="hover:text-[#D9784A] transition-colors"
          >
            <Moon size={18} aria-hidden="true" />
          </button>
          <button aria-label="Account" className="hover:text-[#D9784A] transition-colors">
            👤
          </button>
          <button
            type="button"
            aria-label="Cart"
            onClick={() => setIsOpen(true)}
            className="relative hover:text-[#D9784A] transition-colors"
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D9784A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
