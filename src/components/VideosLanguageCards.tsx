'use client'

import Link from 'next/link'
import { ArrowRight, Video, Play, Briefcase } from 'lucide-react'

type Language = {
  id: string
  title: string
  slug: string
  image?: { url?: string } | string
  videoCount: number
  channelCount?: number
  latestVideoTitle?: string
}

type Props = {
  languages: Language[]
}

function getMediaUrl(media: unknown) {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as { url?: string }).url
  }
  return typeof media === 'string' ? media : undefined
}

export default function VideosLanguageCards({ languages }: Props) {
  if (languages.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-10 text-center text-stone-400">
        No video languages are available yet.
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
      {languages.map((language) => {
        const imageUrl = getMediaUrl(language.image)
        const channelCount = language.channelCount ?? Math.max(1, Math.ceil(language.videoCount / 5))

        return (
          <Link
            key={language.id}
            href={`/videos/language/${language.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/80 shadow-lg transition-all duration-300 hover:border-[#FFE7C3]/50 hover:shadow-2xl hover:shadow-[#FFE7C3]/5"
          >
            {/* Top Image Container with Pill Badge */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
              {/* Top-Left Pill Badge */}
              <div className="absolute top-3 left-3 z-10 rounded-md bg-[#9a3e1b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                Latest Upload
              </div>

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={language.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-stone-600">
                  <Video size={40} aria-hidden="true" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-xl font-extrabold text-white group-hover:text-[#FFE7C3] transition-colors font-serif">
                {language.title}
              </h3>

              {/* Sub-info Icons & Text */}
              <div className="mt-3 space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-2 font-medium">
                  <Briefcase size={14} className="text-[#FFE7C3]" aria-hidden="true" />
                  <span>{channelCount} {channelCount === 1 ? 'Channel' : 'Channels'}</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Play size={14} className="text-[#FFE7C3]" aria-hidden="true" />
                  <span>{language.videoCount.toLocaleString()} Videos</span>
                </div>
              </div>

              {/* Latest episode/video title */}
              {language.latestVideoTitle && (
                <p className="mt-3 text-[11px] text-stone-400 line-clamp-1">
                  {language.latestVideoTitle}
                </p>
              )}

              {/* Explore CTA */}
              <div className="mt-auto flex items-center justify-end pt-4 border-t border-stone-800/60">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFE7C3] group-hover:text-[#f7d89b] transition-colors">
                  Explore <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
