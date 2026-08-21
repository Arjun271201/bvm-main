import React from 'react'

// lucide-react package install la issue irundhadhala, custom inline SVG icons use pannirukom
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  )
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4 4 0 0 0 1.3 5.5c-.6 0-1.2-.2-1.8-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2z" />
    </svg>
  )
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M23 12s0-3.6-.5-5.3a3 3 0 0 0-2.1-2.1C18.6 4 12 4 12 4s-6.6 0-8.4.6A3 3 0 0 0 1.5 6.7C1 8.4 1 12 1 12s0 3.6.5 5.3a3 3 0 0 0 2.1 2.1C5.4 20 12 20 12 20s6.6 0 8.4-.6a3 3 0 0 0 2.1-2.1C23 15.6 23 12 23 12z"
        stroke="none"
      />
      <path d="M9.75 15.5v-7l6 3.5-6 3.5z" fill="#0a0a0a" />
    </svg>
  )
}

function MapPinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2.1z" />
    </svg>
  )
}

function MailIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 6 10-6" />
    </svg>
  )
}

function GlobeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Videos', href: '/videos' },
  { label: 'Support BVM', href: '/support' },
  { label: 'About BVM', href: '/about' },
]

const LEARN_LINKS = [
  { label: 'Bhagavad Gita', href: '/courses' },
  { label: 'Srimad Bhagavatam', href: '/courses' },
  { label: 'Festival Specials', href: '/videos' },
]

const SUPPORT_LINKS = [
  { label: 'Donate', href: '/support' },
  { label: 'Sponsor a Project', href: '/support' },
  { label: 'Volunteer', href: '/support' },
]

const SOCIALS = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: TwitterIcon, label: 'Twitter' },
  { icon: YoutubeIcon, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-red-950 to-red-900 pt-14 pb-8 px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Logo */}
        <div className="col-span-2 md:col-span-1">
          <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center mb-3">
            <span className="font-serif text-lg font-bold bg-gradient-to-br from-yellow-400 to-purple-300 bg-clip-text text-transparent">
              BVM
            </span>
          </div>
          <p className="text-stone-100 text-xs font-medium tracking-wide">BHAKTI VEDANTA MEDIA</p>

          <div className="flex gap-3 mt-5">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-stone-200/80 text-sm hover:text-yellow-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Learn */}
        <div>
          <h4 className="text-white font-semibold mb-4">Learn</h4>
          <ul className="space-y-2">
            {LEARN_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-stone-200/80 text-sm hover:text-yellow-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            {SUPPORT_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-stone-200/80 text-sm hover:text-yellow-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect with us</h4>
          <ul className="space-y-3 text-stone-200/80 text-sm">
            <li className="flex items-center gap-2">
              <MapPinIcon /> Address
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon /> Phone Number
            </li>
            <li className="flex items-center gap-2">
              <MailIcon /> Email
            </li>
            <li className="flex items-center gap-2">
              <GlobeIcon /> Website
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto border-t border-white/10 mt-10 pt-6 text-center">
        <p className="text-stone-300 text-sm">© 2026 Bhakti Vedanta Media.</p>
      </div>
    </footer>
  )
}
