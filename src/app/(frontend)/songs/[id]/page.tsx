import { getPayload } from 'payload'
import config from '@/payload.config'
import SongDetailClient from './SongDetailClient'

type Props = {
  params: Promise<{ id: string }>
}

function getMediaUrl(media: unknown) {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as { url?: string }).url
  }

  return typeof media === 'string' ? media : undefined
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)
    let videoId = parsedUrl.searchParams.get('v')
    if (parsedUrl.hostname === 'youtu.be') videoId = parsedUrl.pathname.slice(1)
    if (parsedUrl.pathname.startsWith('/shorts/')) videoId = parsedUrl.pathname.split('/')[2]
    if (parsedUrl.pathname.startsWith('/embed/')) videoId = parsedUrl.pathname.split('/')[2]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  } catch {
    return null
  }
}

export default async function SongDetailPage({ params }: Props) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let song: any
  try {
    song = await payload.findByID({ collection: 'songs', id, depth: 1 })
  } catch {
    song = null
  }

  if (!song) {
    return (
      <main className="min-h-screen bg-[#130d09] px-6 py-20 text-center text-white">
        <p className="text-stone-400">Song not found.</p>
        <a href="/songs" className="mt-4 inline-block rounded-full bg-[#c5692f] px-5 py-2 text-sm font-semibold text-white">
          Back to songs
        </a>
      </main>
    )
  }

  const coverUrl = getMediaUrl(song.coverImage)
  const audioUrl = getMediaUrl(song.audioFile)
  const youtubeEmbedUrl = getYouTubeEmbedUrl(song.youtubeUrl)

  const { docs: otherSongs } = await payload.find({
    collection: 'songs',
    where: { id: { not_equals: id } },
    sort: '-createdAt',
    limit: 10,
    depth: 1,
  })

  const authorName =
    typeof song.author === 'object' && song.author
      ? song.author.name || song.author.title
      : song.artist || 'Traditional'

  const categoryTitle =
    typeof song.languageCategory === 'object' && song.languageCategory
      ? song.languageCategory.title || song.languageCategory.name
      : song.isMantra
      ? 'Mantra'
      : song.isSloka
      ? 'Sloka'
      : 'Kirtan'

  const formattedSong = {
    id: String(song.id),
    title: song.title,
    artist: song.artist,
    authorName,
    coverUrl,
    audioUrl,
    youtubeUrl: song.youtubeUrl,
    youtubeEmbedUrl,
    audioType: song.audioType || 'youtube',
    duration: song.duration,
    categoryTitle,
    languageTitle: typeof song.languageCategory === 'object' ? song.languageCategory?.title : undefined,
    description: song.description,
  }

  const formattedRelatedSongs = otherSongs.map((otherSong: any) => ({
    id: String(otherSong.id),
    title: otherSong.title,
    artist: otherSong.artist,
    authorName:
      typeof otherSong.author === 'object' && otherSong.author
        ? otherSong.author.name || otherSong.author.title
        : otherSong.artist,
    coverUrl: getMediaUrl(otherSong.coverImage),
    duration: otherSong.duration,
    categoryTitle:
      typeof otherSong.languageCategory === 'object' && otherSong.languageCategory
        ? otherSong.languageCategory.title
        : undefined,
  }))

  return (
    <main className="min-h-screen bg-[#130d09] px-4 py-8 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <SongDetailClient
          song={formattedSong}
          relatedSongs={formattedRelatedSongs}
        />
      </div>
    </main>
  )
}
