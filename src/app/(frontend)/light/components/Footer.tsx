'use client'

import Link from 'next/link'

const quickLinks = [
  'Home',
  'Videos',
  'Courses',
  'Interactive Learning',
  'Song Library',
  'Download',
  'Support BVM',
  'Book store',
  'About BVM',
  'Contact',
]
const learnLinks = [
  'Bhagavad Gita',
  'Srimad Bhagavatam',
  'Festival Specials',
  'Questions & Answers',
  'Devotional Music',
  "Children's Content",
]
const supportLinks = ['Donate', 'Monthly Support', 'Sponsor a Project', 'Volunteer', 'Contact Us']

export default function Footer() {
  return (
    <footer className="bg-[#FBF3E8] border-t border-[#EEE1D0] pt-12 pb-6">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="w-10 h-10 rounded-lg bg-[#2B1A12] flex items-center justify-center mb-3">
            <span className="text-[#D9784A]">✦</span>
          </div>
          <p className="text-[#7A6A5C] text-xs leading-relaxed">
            Bhakti Vedanta Media is dedicated to spreading Krishna Consciousness through digital
            media, educational courses, devotional music, books, and spiritual resources.
          </p>
          <div className="flex gap-2 mt-4">
            {['📷', '👥', '@', '▶'].map((icon, i) => (
              <span
                key={i}
                className="w-8 h-8 rounded-full bg-white border border-[#EEE1D0] flex items-center justify-center text-sm text-[#241711]"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="Learn" links={learnLinks} />
        <FooterColumn title="Support" links={supportLinks} />

        {/* Connect */}
        <div>
          <h4 className="text-[#241711] font-medium text-sm mb-3">Connect with us</h4>
          <ul className="space-y-2 text-[#7A6A5C] text-xs">
            <li>📍 123 Devotional Path, Spiritual City, SC 10108</li>
            <li>📞 +1 (800) 108-0108</li>
            <li>✉️ info@bhaktivedantamedia.org</li>
            <li>🌐 bhaktivedantamedia.org</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-[#B0A28F] text-xs mt-10">© 2026 Bhakti Vedanta Media.</p>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-[#241711] font-medium text-sm mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((label) => (
          <li key={label}>
            <Link
              href="#"
              className="text-[#7A6A5C] text-xs hover:text-[#D9784A] transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
