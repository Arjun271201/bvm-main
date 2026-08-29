'use client'

import Link from 'next/link'
import { ArrowRight, Video } from 'lucide-react'

type Language = {
  id: string
  title: string
  slug: string
  image?: { url?: string } | string
  videoCount: number
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
      <div className="rounded-2xl border border-white/10 bg-stone-900 p-10 text-center text-stone-400">
        No video languages are available yet.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {languages.map((language) => {
        const imageUrl = getMediaUrl(language.image)

        return (
          <Link
            key={language.id}
            href={`/videos/language/${language.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-stone-900 shadow-lg transition-all hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/10"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#2B1A12]">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={language.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/70">
                  <Video size={48} aria-hidden="true" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Video Count Badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-[#B34C13] px-3 py-1">
                <Video size={14} className="text-white" aria-hidden="true" />
                <span className="text-sm font-medium text-white">{language.videoCount}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                {language.title}
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                {language.videoCount} {language.videoCount === 1 ? 'video' : 'videos'}
              </p>

              {/* Explore Button */}
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-xs font-medium text-yellow-500">Explore</span>
                <ArrowRight
                  size={16}
                  className="text-yellow-500 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
