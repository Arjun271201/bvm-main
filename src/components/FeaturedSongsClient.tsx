'use client'

import React from 'react'
import CardCarousel from './CardCarousel'

export default function FeaturedSongsClient({ songs }: { songs: any[] }) {
  return (
    <CardCarousel label="featured songs">
      {songs.map((song: any) => {
        const coverUrl =
          typeof song.coverImage === 'object' && song.coverImage?.url
            ? song.coverImage.url
            : song.coverImage

        return (
          <a
            key={song.id}
            href={`/songs/${song.id}`}
            className="group relative block aspect-[16/9] w-full overflow-hidden rounded-xl"
          >
            {coverUrl && (
              <img
                src={coverUrl}
                alt={song.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute left-3 top-3 text-white/90">
              <span className="text-xl" aria-hidden="true">
                ♪
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-medium">{song.title}</h3>
            </div>
          </a>
        )
      })}
    </CardCarousel>
  )
}
