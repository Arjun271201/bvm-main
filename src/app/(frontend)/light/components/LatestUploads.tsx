import Link from 'next/link'
import CardCarousel from '@/components/CardCarousel'

type Upload = {
  id: string
  title: string
  description: string
  image: string
}

export default function LatestUploads({ uploads }: { uploads: Upload[] }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#241711] text-2xl font-semibold">Latest Uploads</h2>
        <Link
          href="/videos"
          className="flex items-center gap-1 text-sm text-[#D9784A] border border-[#D9784A] rounded-full px-4 py-1.5 hover:bg-[#D9784A] hover:text-white transition-colors"
        >
          View More →
        </Link>
      </div>

      <CardCarousel label="latest uploads">
        {uploads.map((item) => (
          <Link
            key={item.id}
            href={`/videos/${item.id}`}
            className="group relative block aspect-[16/9] overflow-hidden rounded-xl border border-[#EEE1D0] bg-[#2B1A12]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center text-2xl text-white opacity-90">
              ▶
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="mb-1 line-clamp-1 text-sm font-medium text-white">{item.title}</h3>
              <p className="line-clamp-2 text-xs text-white/80">{item.description}</p>
            </div>
          </Link>
        ))}
      </CardCarousel>
    </section>
  )
}
