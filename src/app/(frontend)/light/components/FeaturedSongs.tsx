import Link from 'next/link'
import CardCarousel from '@/components/CardCarousel'

type Song = {
  id: string
  title: string
  artist: string
  duration: string
  image: string
}

export default function FeaturedSongs({ songs }: { songs: Song[] }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#241711] text-2xl font-semibold">Featured Songs</h2>
        <Link
          href="/songs"
          className="flex items-center gap-1 text-sm text-[#D9784A] border border-[#D9784A] rounded-full px-4 py-1.5 hover:bg-[#D9784A] hover:text-white transition-colors"
        >
          View More →
        </Link>
      </div>

      <CardCarousel label="featured songs">
        {songs.map((song) => (
          <Link
            key={song.id}
            href={`/songs/${song.id}`}
            className="group relative block aspect-[16/9] overflow-hidden rounded-xl"
          >
            <img
              src={song.image}
              alt={song.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-3 top-3 text-lg text-white">♫</span>
            {song.duration && (
              <span className="absolute right-3 top-3 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
                {song.duration}
              </span>
            )}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-sm font-medium text-white">{song.title}</h3>
              <p className="text-xs text-white/80">{song.artist}</p>
            </div>
          </Link>
        ))}
      </CardCarousel>
    </section>
  )
}
