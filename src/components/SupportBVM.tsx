import React from 'react'

const oneTime = [350, 500, 1000, 2000]
const monthly = [100, 500, 1000, 2000]
const specialProjects = ['Ramanujar Series', 'Sri Caitanyar Series', 'Documentary Projects']

export default function SupportBVM({
  heading = 'Support BVM',
  variant = 'home',
}: {
  heading?: string
  variant?: 'home' | 'footer-cta'
}) {
  if (variant === 'footer-cta') {
    return (
      <section className="flex flex-col items-center justify-center bg-[#2c0002] px-6 py-7 text-center sm:py-9">
        <div className="mx-auto flex flex-col items-center text-center max-w-[600px]">
          <h2 className="text-center text-xl font-semibold tracking-tight text-[#f2c291] sm:text-2xl">
            {heading}
          </h2>
          <p className="mx-auto mt-2 text-center max-w-[480px] text-xs leading-relaxed text-[#e6d7c7]/85 sm:text-sm">
            Your contribution helps us spread the message of Bhakti to the world.
          </p>
          <div className="mt-5 flex justify-center">
            <a
              href="/support"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFE7C3] hover:bg-[#3a0a0a] text-[#512D26] hover:text-yellow-400 border border-transparent hover:border-yellow-400/60 px-6 py-2 text-xs font-semibold shadow-md transition-all duration-200 sm:text-sm"
            >
              <span>Support Us</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#2c0002] py-[25px] px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-white text-2xl font-semibold mb-6">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* One-Time Support Card */}
          <div className="bg-[#FFE7C3] rounded-2xl p-7 flex flex-col justify-between h-full shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#421d18] mb-6">One - Time Support</h3>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {oneTime.map((amt) => (
                <a
                  key={amt}
                  href={`/support?amount=${amt}&type=one-time#one-time-support`}
                  className="bg-white text-[#421d18] font-medium text-base py-3 rounded-xl shadow-sm hover:bg-[#421d18] hover:text-yellow-400 transition-all duration-200 cursor-pointer text-center block"
                >
                  ₹{amt}
                </a>
              ))}
            </div>
            <a
              href="/support#one-time-support"
              className="block text-center w-full bg-[#421d18] text-white font-semibold rounded-2xl py-3.5 hover:bg-[#2c0002] hover:text-yellow-400 transition-all duration-200 shadow-md text-base cursor-pointer mt-auto"
            >
              Donate Now
            </a>
          </div>

          {/* Monthly Support Card */}
          <div className="bg-[#FFE7C3] rounded-2xl p-7 flex flex-col justify-between h-full shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#421d18] mb-6">Monthly - Support</h3>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {monthly.map((amt) => (
                <a
                  key={amt}
                  href={`/support?amount=${amt}&type=monthly`}
                  className="bg-white text-[#421d18] font-medium text-base py-3 rounded-xl shadow-sm hover:bg-[#421d18] hover:text-yellow-400 transition-all duration-200 cursor-pointer text-center block"
                >
                  ₹{amt}
                </a>
              ))}
            </div>
            <a
              href="/support"
              className="block text-center w-full bg-[#421d18] text-white font-semibold rounded-2xl py-3.5 hover:bg-[#2c0002] hover:text-yellow-400 transition-all duration-200 shadow-md text-base cursor-pointer mt-auto"
            >
              Join Monthly Support
            </a>
          </div>

          {/* Special Projects Card */}
          <div className="bg-[#FFE7C3] rounded-2xl p-7 flex flex-col justify-between h-full shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[#421d18] mb-6">Support a Special Project</h3>
            <ul className="mb-8 space-y-3 text-left">
              {specialProjects.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 text-base font-semibold text-[#421d18]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#421d18]" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="/support"
              className="block text-center w-full bg-[#421d18] text-white font-semibold rounded-2xl py-3.5 hover:bg-[#2c0002] hover:text-yellow-400 transition-all duration-200 mt-auto shadow-md text-base cursor-pointer"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
