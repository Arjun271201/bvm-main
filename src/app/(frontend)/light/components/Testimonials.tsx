type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  avatar: string
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <h2 className="text-[#241711] text-2xl font-semibold mb-6">Testimonials</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-[#EEE1D0] p-5">
            <span className="text-[#D9784A] text-2xl leading-none">"</span>
            <p className="text-[#5C4E42] text-sm my-3">{t.quote}</p>
            <div className="flex items-center gap-3 mt-4">
              <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-[#241711] text-sm font-medium">{t.name}</p>
                <p className="text-[#7A6A5C] text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full ${i === 0 ? 'w-6 bg-[#D9784A]' : 'w-1.5 bg-[#EEE1D0]'}`}
          />
        ))}
      </div>
    </section>
  )
}
