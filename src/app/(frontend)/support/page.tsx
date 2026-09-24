'use client'

import React, { useState } from 'react'
import {
  Heart,
  Bell,
  ChevronDown,
  ChevronUp,
  Video,
  BookOpen,
  Users,
  Scroll,
  Pencil,
  Sparkles,
  Calendar,
  Film,
  HandHeart,
} from 'lucide-react'

const FAQS = [
  {
    q: 'Is my donation secure?',
    a: 'Yes, we use industry-standard encryption and secure payment gateways to ensure your financial information is always protected. Our systems are regularly audited for security compliance.',
  },
  {
    q: 'Can I donate internationally?',
    a: 'Yes, we accept international contributions via credit/debit cards, Razorpay, and PayPal from supporters around the world.',
  },
  {
    q: 'Are my contributions tax-deductible?',
    a: 'Yes, contributions may be eligible for tax exemption under applicable local tax regulations (e.g. 80G in India). You will receive an official digital receipt via email.',
  },
  {
    q: 'Can I modify or cancel my monthly subscription?',
    a: 'You can manage, pause, or cancel your monthly recurring support at any time by reaching out to our support team or through your account dashboard.',
  },
]

export default function SupportPage() {
  const [customAmount, setCustomAmount] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleDonation = (amount: string | number, type: string, project?: string) => {
    const query = new URLSearchParams({
      amount: String(amount),
      type,
      ...(project && { project }),
    }).toString()
    window.location.href = `/api/donations?${query}`
  }

  return (
    <div className="bg-[#2c0002] min-h-screen text-stone-100">
      {/* 1. Hero Banner Section */}
      <section className="relative bg-[#2c0002] text-white py-16 px-6 sm:px-12 md:py-24 overflow-hidden border-b border-stone-800/80">
        <div
          className="absolute inset-0 z-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: `url('/media/Donations.png')` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2c0002]/70 via-[#2c0002]/90 to-[#2c0002]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-[#FFE7C3]">
            Support BVM
          </h1>
          <p className="text-base sm:text-lg font-medium text-stone-200 mb-3 max-w-2xl">
            Help us spread Krishna Consciousness through media, education and devotional content.
          </p>
          <p className="text-xs sm:text-sm text-stone-300/85 mb-8 max-w-3xl leading-relaxed">
            Your support enables us to create spiritual videos, educational courses, books and community resources for devotees around the world.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#one-time-support"
              className="bg-[#FFE7C3] hover:bg-[#3a0a0a] text-[#512D26] hover:text-yellow-400 border border-transparent hover:border-yellow-400/60 font-semibold px-7 py-3 rounded-full text-sm transition-all shadow-md hover:scale-105"
            >
              Support Now
            </a>
            <a
              href="#impact"
              className="border border-stone-500 hover:border-yellow-400 text-stone-200 hover:text-yellow-400 font-semibold px-7 py-3 rounded-full text-sm transition-all hover:bg-white/5"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* 2. One-Time Support Section */}
        <section id="one-time-support" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFE7C3] mb-2 font-serif">
              One-Time Support
            </h2>
            <p className="text-sm text-stone-300/85">Choose an amount to make a one-time contribution.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ₹500 */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#421d18]/10 flex items-center justify-center text-[#421d18] mb-4">
                  <Heart size={20} />
                </div>
                <div className="text-2xl font-bold text-[#421d18] mb-2">₹500</div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Support devotional content creation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(500, 'one-time')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Heart size={16} className="fill-current opacity-80" />
                <span>Donate ₹500</span>
              </button>
            </div>

            {/* ₹1000 */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#421d18]/10 flex items-center justify-center text-[#421d18] mb-4">
                  <Scroll size={20} />
                </div>
                <div className="text-2xl font-bold text-[#421d18] mb-2">₹1000</div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Help preserve sacred manuscripts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(1000, 'one-time')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Heart size={16} className="fill-current opacity-80" />
                <span>Donate ₹1000</span>
              </button>
            </div>

            {/* ₹5000 */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#421d18]/10 flex items-center justify-center text-[#421d18] mb-4">
                  <Video size={20} />
                </div>
                <div className="text-2xl font-bold text-[#421d18] mb-2">₹5000</div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Sponsor a high-fidelity video production.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(5000, 'one-time')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Heart size={16} className="fill-current opacity-80" />
                <span>Donate ₹5000</span>
              </button>
            </div>

            {/* Custom Amount */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#421d18]/10 flex items-center justify-center text-[#421d18] mb-4">
                  <Pencil size={20} />
                </div>
                <div className="text-[#421d18] font-bold text-sm mb-1">Custom Amount</div>
                <p className="text-xs text-[#512D26]/90 mb-3 font-medium">Choose your own contribution</p>
                <div className="relative mb-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#421d18] font-semibold">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-white border border-[#421d18]/30 rounded-xl pl-8 pr-3 py-2 text-sm text-[#421d18] placeholder-[#7A584A] focus:outline-none focus:border-[#421d18]"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(customAmount || 100, 'one-time-custom')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Heart size={16} className="fill-current opacity-90" />
                <span>Donate Custom</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Become a Monthly Supporter Section */}
        <section className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFE7C3] mb-2 font-serif">
              Become a Monthly Supporter
            </h2>
            <p className="text-sm text-stone-300/85">
              Provide ongoing support and help sustain our mission to bring spiritual wisdom to the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ₹100/mo */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-[#421d18]">₹100</span>
                  <span className="text-xs text-[#512D26]/80 font-medium">/mo</span>
                </div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Support regular content updates and daily inspirations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(100, 'monthly')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Bell size={16} />
                <span>Subscribe</span>
              </button>
            </div>

            {/* ₹250/mo */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-[#421d18]">₹250</span>
                  <span className="text-xs text-[#512D26]/80 font-medium">/mo</span>
                </div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Empower educational outreach and community study guides.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(250, 'monthly')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Bell size={16} />
                <span>Subscribe</span>
              </button>
            </div>

            {/* ₹500/mo */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-[#421d18]">₹500</span>
                  <span className="text-xs text-[#512D26]/80 font-medium">/mo</span>
                </div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Fuel high-quality devotional media and video production.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(500, 'monthly')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Bell size={16} />
                <span>Subscribe</span>
              </button>
            </div>

            {/* ₹1000/month (Most Popular) */}
            <div className="relative bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border-2 border-[#421d18] shadow-xl transition-all flex flex-col justify-between">
              <span className="absolute -top-3 right-4 bg-[#421d18] text-yellow-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                Most Popular
              </span>
              <div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-[#421d18]">₹1000</span>
                  <span className="text-xs text-[#512D26]/80 font-medium">/month</span>
                </div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Sustain major media initiatives and platform expansion globally.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(1000, 'monthly')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Bell size={16} />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. Support Upcoming Projects Section */}
        <section className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFE7C3] mb-2 font-serif">
              Support Upcoming Projects
            </h2>
            <p className="text-sm text-stone-300/85">Contribute towards specific devotional media projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ramanujar Series */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#421d18]/10 flex items-center justify-center text-[#421d18]">
                    <Calendar size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-[#421d18]">Ramanujar Series</h3>
                </div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  A comprehensive video series exploring the life and teachings of Sri Ramanuja, bringing ancient wisdom to modern audiences through high-quality devotional media.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(1000, 'project', 'Ramanujar Series')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <HandHeart size={16} />
                <span>Support Project</span>
              </button>
            </div>

            {/* Sri Caitanya Series */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#421d18]/10 flex items-center justify-center text-[#421d18]">
                    <Scroll size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-[#421d18]">Sri Caitanya Series</h3>
                </div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Documenting the vibrant history and sankirtan movement of Sri Caitanya Mahaprabhu, capturing the essence of devotion through cinematic storytelling.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(1000, 'project', 'Sri Caitanya Series')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <HandHeart size={16} />
                <span>Support Project</span>
              </button>
            </div>

            {/* Documentary Projects */}
            <div className="bg-[#FFE7C3] text-[#421d18] rounded-2xl p-6 border border-[#f5d9aa] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#421d18]/10 flex items-center justify-center text-[#421d18]">
                    <Film size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-[#421d18]">Documentary Projects</h3>
                </div>
                <p className="text-xs text-[#512D26]/90 leading-relaxed mb-6 font-medium">
                  Sustaining our ongoing efforts to film and preserve sacred sites, temple traditions, and devotional festivals across India for future generations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDonation(1000, 'project', 'Documentary Projects')}
                className="w-full bg-[#421d18] text-white hover:bg-[#2c0002] hover:text-yellow-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <HandHeart size={16} />
                <span>Support Project</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. Your Contribution Makes a Difference Section */}
        <section id="impact" className="scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFE7C3] mb-2 font-serif">
              Your Contribution Makes a Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#3a0a0a] rounded-2xl p-6 border border-stone-800/90 shadow-md text-center flex flex-col items-center hover:border-amber-700/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-yellow-400 mb-4">
                <Video size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Media Production</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Creating devotional videos, documentaries, and digital content that inspire spiritual growth.
              </p>
            </div>

            <div className="bg-[#3a0a0a] rounded-2xl p-6 border border-stone-800/90 shadow-md text-center flex flex-col items-center hover:border-amber-700/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-yellow-400 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Educational Programs</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Developing courses, workshops, and learning materials for devotees worldwide.
              </p>
            </div>

            <div className="bg-[#3a0a0a] rounded-2xl p-6 border border-stone-800/90 shadow-md text-center flex flex-col items-center hover:border-amber-700/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-yellow-400 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Community Outreach</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Supporting local communities and spreading Krishna consciousness globally.
              </p>
            </div>

            <div className="bg-[#3a0a0a] rounded-2xl p-6 border border-stone-800/90 shadow-md text-center flex flex-col items-center hover:border-amber-700/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-yellow-400 mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Spiritual Resources</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Publishing books, articles, and digital resources for spiritual advancement.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Frequently Asked Questions Section */}
        <section className="scroll-mt-24 pb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFE7C3] mb-2 font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-stone-300/85">
              Find answers to common questions about supporting our mission and digital sanctuary.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="bg-[#3a0a0a] rounded-2xl border border-stone-800/90 shadow-md overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base text-stone-100 hover:text-yellow-400 transition-colors">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-yellow-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-stone-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
