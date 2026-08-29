import React from 'react'

const oneTime = [350, 500, 1000, 2000]
const monthly = [100, 500, 1000, 2000]
const specialProjects = ['Ramanujar Series', 'Sri Caitanyar Series', 'Documentary Projects']

export default function SupportBVM({ heading = 'Support BVM' }: { heading?: string }) {
  return (
    <section className="bg-black py-14 px-8">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-white text-2xl font-semibold mb-6">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* One-Time */}
          <div className="bg-stone-200 rounded-xl p-7 text-stone-900 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-5">One - Time Support</h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {oneTime.map((amt) => (
                <button
                  key={amt}
                  className="border border-stone-400 rounded-lg py-2 text-sm hover:bg-white"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <form action="/api/donations" method="POST" className="mt-auto">
              <input type="hidden" name="donationType" value="one-time" />
              <button
                type="submit"
                className="w-full bg-purple-700 text-white rounded-full py-2.5 hover:bg-purple-800"
              >
                Donate Now
              </button>
            </form>
          </div>

          {/* Monthly */}
          <div className="bg-stone-200 rounded-xl p-7 text-stone-900 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-5">Monthly - Support</h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {monthly.map((amt) => (
                <button
                  key={amt}
                  className="border border-stone-400 rounded-lg py-2 text-sm hover:bg-white"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <form action="/api/donations" method="POST" className="mt-auto">
              <input type="hidden" name="donationType" value="monthly" />
              <button
                type="submit"
                className="w-full bg-purple-700 text-white rounded-full py-2.5 hover:bg-purple-800"
              >
                Join Monthly Support
              </button>
            </form>
          </div>

          {/* Special Project */}
          <div className="bg-stone-200 rounded-xl p-7 text-stone-900 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-4">Support a Special Project</h3>
            <ul className="mb-6 space-y-2">
              {specialProjects.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-700" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="/support/projects"
              className="block text-center w-full bg-purple-700 text-white rounded-full py-2.5 hover:bg-purple-800 mt-auto"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
