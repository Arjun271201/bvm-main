import Link from 'next/link'
import CardCarousel from '@/components/CardCarousel'

type Book = {
  id: string
  title: string
  author: string
  image: string
  description?: string
  stock: number
}

export default function FeaturedBooks({ books }: { books: Book[] }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#241711] text-2xl font-semibold">Featured Books</h2>
        <Link
          href="/store"
          className="flex items-center gap-1 text-sm text-[#D9784A] border border-[#D9784A] rounded-full px-4 py-1.5 hover:bg-[#D9784A] hover:text-white transition-colors"
        >
          View More →
        </Link>
      </div>

      <CardCarousel label="featured books" desktopColumns={6}>
        {books.map((book) => (
          <div
            key={book.id}
            className="flex h-full flex-col overflow-hidden rounded-xl border border-[#EEE1D0] bg-white"
          >
            <Link
              href={`/store/${book.id}`}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {book.description && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/70 p-3 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="line-clamp-6">{book.description}</span>
                </span>
              )}
              <span
                className={`absolute right-2 top-2 rounded-full px-2 py-1 text-[11px] font-semibold ${book.stock > 0 ? 'bg-emerald-400 text-stone-950' : 'bg-red-400 text-white'}`}
              >
                {book.stock > 0 ? `In Stock (${book.stock})` : 'Out of Stock'}
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-8 text-sm font-medium text-white">
                {book.title}
              </span>
            </Link>
            <div className="mt-auto p-3">
              <Link
                href={`/store/${book.id}`}
                className="block rounded-full bg-[#D9784A] py-2 text-center text-sm font-medium text-white hover:bg-[#c96b3f]"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </CardCarousel>
    </section>
  )
}
