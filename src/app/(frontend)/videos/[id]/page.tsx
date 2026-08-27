import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

type Props = {
  params: Promise<{ id: string }>
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)
    let videoId = parsedUrl.searchParams.get('v')

    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1)
    } else if (parsedUrl.pathname.startsWith('/shorts/')) {
      videoId = parsedUrl.pathname.split('/')[2]
    } else if (parsedUrl.pathname.startsWith('/embed/')) {
      videoId = parsedUrl.pathname.split('/')[2]
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  } catch {
    return null
  }
}

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let video: any
  try {
    video = await payload.findByID({ collection: 'videos', id })
  } catch {
    video = null
  }

  if (!video) {
    return (
      <div className="mx-auto max-w-2xl px-8 py-20 text-center text-white">
        <p>Video not found.</p>
        <a href="/" className="mt-3 inline-block text-yellow-400 underline">
          Go back home
        </a>
      </div>
    )
  }

  const thumbnailUrl =
    typeof video.thumbnail === 'object' && video.thumbnail?.url
      ? video.thumbnail.url
      : video.thumbnail
  const videoFileUrl =
    typeof video.videoFile === 'object' && video.videoFile?.url
      ? video.videoFile.url
      : video.videoFile
  const youtubeEmbedUrl = getYouTubeEmbedUrl(video.youtubeUrl)
  const { docs: otherVideos } = await payload.find({
    collection: 'videos',
    where: { id: { not_equals: id } },
    sort: '-publishedDate',
    limit: 10,
  })

  return (
    <main className="min-h-screen w-full bg-stone-950 px-2 pb-12 pt-5 text-10 text-white md:pt-10">
      <div className="mx-auto grid max-w-[1050px] gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 overflow-hidden rounded-xl bg-stone-900 shadow-2xl">
          <div className="aspect-video bg-black">
            {video.videoType === 'youtube' && youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : video.videoType === 'upload' && videoFileUrl ? (
              <video controls poster={thumbnailUrl} className="h-full w-full">
                <source src={videoFileUrl} />
                Your browser does not support video playback.
              </video>
            ) : thumbnailUrl ? (
              <img src={thumbnailUrl} alt={video.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-stone-400">
                Video unavailable
              </div>
            )}
          </div>

          <div className="p-5 md:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-stone-400">
              {video.languageCategory && (
                <span>{video.languageCategory.title || video.languageCategory.name}</span>
              )}
              {video.duration && <span>{video.duration}</span>}
              {video.publishedDate && (
                <time dateTime={video.publishedDate}>
                  {new Date(video.publishedDate).toLocaleDateString('en-IN')}
                </time>
              )}
            </div>
            <h1 className="text-[18px] font-serif font-semibold">{video.title}</h1>
            <p className="mt-4 text-[14px] whitespace-pre-line leading-relaxed text-stone-300">
              {video.description}
            </p>
          </div>
        </article>

        <aside className="rounded-xl bg-stone-900/80 p-4 lg:h-[620px] lg:overflow-y-auto">
          <h2 className="mb-4 text-xl font-semibold">More Videos</h2>
          <div className="space-y-3">
            {otherVideos.map((otherVideo: any) => {
              const otherThumbnail =
                typeof otherVideo.thumbnail === 'object' && otherVideo.thumbnail?.url
                  ? otherVideo.thumbnail.url
                  : otherVideo.thumbnail

              return (
                <article key={otherVideo.id} className="flex gap-3 border-b border-white/10 pb-3">
                  <a
                    href={`/videos/${otherVideo.id}`}
                    className="group relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-black"
                  >
                    {otherThumbnail && (
                      <img
                        src={otherThumbnail}
                        alt={otherVideo.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-xl opacity-0 transition-opacity group-hover:opacity-100">
                      ▶
                    </span>
                  </a>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-medium">{otherVideo.title}</h3>
                    <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-stone-400">
                      {otherVideo.description}
                    </p>
                    <a
                      href={`/videos/${otherVideo.id}`}
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
