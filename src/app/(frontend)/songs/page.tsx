import { getPayload } from 'payload'
import config from '@/payload.config'
import SongsClient from './SongsClient'

type Props = {
  searchParams: Promise<{
    category?: string
    letter?: string
    author?: string
    type?: string
    q?: string
  }>
}

function getMediaUrl(media: unknown) {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as { url?: string }).url
  }
  return typeof media === 'string' ? media : undefined
}

export default async function SongsPage({ searchParams }: Props) {
  const {
    category: selectedSlug,
    letter: selectedLetter,
    author: selectedAuthorId,
    type: selectedType,
    q: searchTerm,
  } = await searchParams

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [{ docs: languages }, { docs: authors }, { docs: songs }] = await Promise.all([
    payload.find({ collection: 'languages', sort: 'order', limit: 100 }),
    payload.find({ collection: 'authors', sort: 'name', limit: 1000 }),
    payload.find({ collection: 'songs', sort: '-createdAt', limit: 1000, depth: 2 }),
  ])

  const formattedSongs = songs.map((song: any) => ({
    id: String(song.id),
    title: song.title,
    artist: song.artist,
    author:
      typeof song.author === 'object' && song.author
        ? { id: String(song.author.id), name: song.author.name, slug: song.author.slug }
        : song.author,
    coverImage: getMediaUrl(song.coverImage),
    audioFile: getMediaUrl(song.audioFile),
    youtubeUrl: song.youtubeUrl,
    audioType: song.audioType,
    duration: song.duration,
    languageCategory:
      typeof song.languageCategory === 'object' && song.languageCategory
        ? {
            id: String(song.languageCategory.id),
            title: song.languageCategory.title,
            slug: song.languageCategory.slug,
          }
        : song.languageCategory,
    isRegular: Boolean(song.isRegular),
    isMantra: Boolean(song.isMantra),
    isSloka: Boolean(song.isSloka),
  }))

  const formattedLanguages = languages.map((lang: any) => ({
    id: String(lang.id),
    title: lang.title,
    slug: lang.slug,
  }))

  const formattedAuthors = authors.map((author: any) => ({
    id: String(author.id),
    name: author.name,
    slug: author.slug,
  }))

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-14 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1250px]">
        <SongsClient
          initialSongs={formattedSongs}
          languages={formattedLanguages}
          authors={formattedAuthors}
          initialCategory={selectedSlug ?? ''}
          initialAuthor={selectedAuthorId ?? 'all'}
          initialType={selectedType ?? 'all'}
          initialLetter={selectedLetter ?? 'All'}
          initialQuery={searchTerm ?? ''}
        />
      </div>
    </main>
  )
}
