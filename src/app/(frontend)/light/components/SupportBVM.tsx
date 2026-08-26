const oneTimeAmounts = ['₹500', '₹1000', '₹2500', '₹5000']
const monthlyAmounts = ['₹100', '₹250', '₹500', '₹1000']
const projects = ['Ramanujar Series', 'Sri Caitanyar Series', 'Documentary Projects']

export default function SupportBVM() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <h2 className="text-[#241711] text-2xl font-semibold mb-6">Support BVM</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* One-Time */}
        <div className="bg-white rounded-xl border border-[#EEE1D0] p-6">
          <h3 className="text-[#241711] font-semibold mb-2">One-Time Support</h3>
          <p className="text-[#7A6A5C] text-sm mb-5">
            Make a single contribution to support BVM's devotional media and outreach initiatives.
            Every offering helps us reach more hearts with Krishna consciousness.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {oneTimeAmounts.map((amt) => (
              <button
                key={amt}
                className="border border-[#EEE1D0] text-[#241711] text-sm px-4 py-1.5 rounded-md hover:border-[#D9784A] transition-colors"
              >
                {amt}
              </button>
            ))}
          </div>
          <button className="w-full bg-[#D9784A] hover:bg-[#c96b3f] text-white text-sm font-medium py-2.5 rounded-md transition-colors">
            Donate Now
          </button>
        </div>

        {/* Monthly */}
        <div className="bg-white rounded-xl border border-[#EEE1D0] p-6">
          <h3 className="text-[#241711] font-semibold mb-2">Monthly Support</h3>
          <p className="text-[#7A6A5C] text-sm mb-5">
            Become a recurring supporter and sustain our mission with a small monthly gift. Your
            ongoing devotion powers our video, courses, and outreach work.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {monthlyAmounts.map((amt) => (
              <button
                key={amt}
                className="border border-[#EEE1D0] text-[#241711] text-sm px-4 py-1.5 rounded-md hover:border-[#6E2027] transition-colors"
              >
                {amt}
              </button>
            ))}
          </div>
          <button className="w-full bg-[#6E2027] hover:bg-[#5c1a20] text-white text-sm font-medium py-2.5 rounded-md transition-colors">
            Join Monthly Support
          </button>
        </div>

        {/* Special Project */}
        <div className="bg-[#F3E3D6] rounded-xl p-6">
          <h3 className="text-[#241711] font-semibold mb-3">Support a Special Project</h3>
          <ul className="space-y-2 mb-6">
            {projects.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[#241711] text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9784A]" />
                {p}
              </li>
            ))}
          </ul>
          <button className="w-full border border-[#D9784A] text-[#D9784A] text-sm font-medium py-2.5 rounded-md hover:bg-[#D9784A] hover:text-white transition-colors">
            Explore
          </button>
        </div>
      </div>
    </section>
  )
}
