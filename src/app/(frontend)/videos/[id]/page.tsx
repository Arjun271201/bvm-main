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

import { SetBreadcrumbs } from '@/components/BreadcrumbContext'

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let video: any
  try {
    video = await payload.findByID({ collection: 'videos', id, depth: 1 })
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

  let languageSlug = 'all'
  let languageTitle = ''

  if (video.languageCategory) {
    if (typeof video.languageCategory === 'object') {
      languageSlug = video.languageCategory.slug || 'all'
      languageTitle = video.languageCategory.title || video.languageCategory.name || ''
    } else {
      try {
        const langDoc = await payload.findByID({
          collection: 'languages',
          id: String(video.languageCategory),
        })
        if (langDoc) {
          languageSlug = langDoc.slug || 'all'
          languageTitle = langDoc.title || ''
        }
      } catch {}
    }
  }

  const breadcrumbItems = [
    { label: 'VIDEOS', href: '/videos' },
    ...(languageTitle
      ? [{ label: languageTitle.toUpperCase(), href: `/videos/language/${languageSlug}` }]
      : []),
    { label: video.title },
  ]

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
    <main className="w-full bg-[#2c0002] px-4 sm:px-6 md:px-10 lg:px-14 py-2 text-white h-[80vh] max-h-[80vh] flex flex-col justify-center overflow-hidden">
      <SetBreadcrumbs items={breadcrumbItems} />
      <div className="mx-auto max-w-[1400px] w-full h-full grid gap-3 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] items-stretch min-h-0 py-1">
        <article className="min-w-0 overflow-hidden rounded-2xl bg-stone-900/90 border border-white/10 shadow-2xl flex flex-col h-full min-h-0">
          <div className="bg-black flex-shrink-0 w-full h-[70%] relative">
            {video.videoType === 'youtube' && youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={video.title}
                className="h-full w-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : video.videoType === 'upload' && videoFileUrl ? (
              <video controls poster={thumbnailUrl} className="h-full w-full object-cover">
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

          <div className="p-3.5 md:p-4 h-[30%] flex flex-col justify-center ">
            <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-stone-400 flex-shrink-0">
              {video.languageCategory && (
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
                  {video.languageCategory.title || video.languageCategory.name}
                </span>
              )}
              {video.duration && (
                <span className="rounded bg-black/40 px-2 py-0.5">{video.duration}</span>
              )}
              {video.publishedDate && (
                <time dateTime={video.publishedDate} className="text-stone-400">
                  {new Date(video.publishedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              )}
            </div>
            <h1 className="text-base md:text-lg font-serif font-bold text-white leading-snug flex-shrink-0">
              {video.title}
            </h1>
            <p className="mt-1 text-xs whitespace-pre-line leading-relaxed text-stone-300">
              {video.description}
            </p>
          </div>
        </article>

        <aside className="rounded-2xl bg-stone-900/90 border border-white/10 p-5 shadow-2xl flex flex-col h-full min-h-0 overflow-hidden">
          <h2 className="mb-4 text-xl font-semibold text-white pb-3 flex items-center justify-between flex-shrink-0">
            <span>More Videos</span>
            <span className="text-xs font-normal text-stone-400">{otherVideos.length} videos</span>
          </h2>
          <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 min-h-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-700 [&::-webkit-scrollbar-track]:bg-transparent">
            {otherVideos.map((otherVideo: any) => {
              const otherThumbnail =
                typeof otherVideo.thumbnail === 'object' && otherVideo.thumbnail?.url
                  ? otherVideo.thumbnail.url
                  : otherVideo.thumbnail

              return (
                <article
                  key={otherVideo.id}
                  className="flex gap-3.5 border-b border-white/5 pb-3.5 last:border-b-0"
                >
                  <a
                    href={`/videos/${otherVideo.id}`}
                    className="group relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-black"
                  >
                    {otherThumbnail && (
                      <img
                        src={otherThumbnail}
                        alt={otherVideo.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-base opacity-0 transition-opacity group-hover:opacity-100">
                      ▶
                    </span>
                  </a>
                  <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="line-clamp-2 text-sm font-medium text-white group-hover:text-yellow-400 transition-colors">
                        {otherVideo.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-xs text-stone-400">
                        {otherVideo.description}
                      </p>
                    </div>
                    <a
                      href={`/videos/${otherVideo.id}`}
                      className="mt-2 w-fit rounded-full bg-[#FFE7C3] text-[#512D26] px-3 py-0.5 text-xs font-semibold hover:bg-yellow-400 transition-colors"
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
