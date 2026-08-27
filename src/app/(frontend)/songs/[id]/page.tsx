import { getPayload } from 'payload'
import config from '@/payload.config'

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
      <main className="min-h-screen bg-stone-950 px-6 py-20 text-center text-white">
        <p>Song not found.</p>
        <a href="/songs" className="mt-3 inline-block text-yellow-400 underline">
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

  return (
    <main className="min-h-screen bg-stone-950 px-4 py-10 text-white md:px-8">
      <div className="mx-auto grid max-w-[1050px] gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="overflow-hidden rounded-xl bg-stone-900 shadow-2xl">
          <div className="aspect-video bg-black">
            {song.audioType === 'youtube' && youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={song.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : song.audioType === 'upload' && audioUrl ? (
              <div className="relative h-full w-full bg-black">
                {coverUrl && (
                  <img src={coverUrl} alt={song.title} className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-black/70 p-5">
                  <audio controls className="w-full" src={audioUrl} />
                </div>
              </div>
            ) : coverUrl ? (
              <img src={coverUrl} alt={song.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-stone-400">
                Song unavailable
              </div>
            )}
          </div>
          <div className="p-6 md:p-8">
            {song.languageCategory?.title && (
              <p className="mb-3 text-sm text-yellow-400">{song.languageCategory.title}</p>
            )}
            <h1 className="text-3xl font-serif font-semibold">{song.title}</h1>
            {song.artist && <p className="mt-2 text-stone-400">{song.artist}</p>}
            {song.duration && (
              <p className="mt-4 text-sm text-stone-500">Duration: {song.duration}</p>
            )}
          </div>
        </article>

        <aside className="rounded-xl bg-stone-900/80 p-4 lg:h-[620px] lg:overflow-y-auto">
          <h2 className="mb-4 text-xl font-semibold">More Songs</h2>
          <div className="space-y-3">
            {otherSongs.map((otherSong: any) => {
              const otherCover = getMediaUrl(otherSong.coverImage)

              return (
                <article key={otherSong.id} className="flex gap-3 border-b border-white/10 pb-3">
                  <a
                    href={`/songs/${otherSong.id}`}
                    className="group relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-black"
                  >
                    {otherCover && (
                      <img
                        src={otherCover}
                        alt={otherSong.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-xl text-white opacity-0 transition-opacity group-hover:opacity-100">
                      ▶
                    </span>
                  </a>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-medium">{otherSong.title}</h3>
                    {otherSong.artist && (
                      <p className="mt-1 line-clamp-1 text-xs text-stone-400">{otherSong.artist}</p>
                    )}
                    <a
                      href={`/songs/${otherSong.id}`}
                      className="mt-2 inline-block rounded-full border border-yellow-500/40 px-3 py-1 text-xs text-yellow-300 hover:bg-yellow-500/10"
                    >
                      View
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </aside>
      </div>
    </main>
  )
}
