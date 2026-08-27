'use client'

import React from 'react'
import CardCarousel from './CardCarousel'
import FeaturedSongCard from './FeaturedSongCard'

export default function FeaturedSongsClient({ songs }: { songs: any[] }) {
  return (
    <CardCarousel label="featured songs">
      {songs.map((song: any) => {
        const coverUrl =
          typeof song.coverImage === 'object' && song.coverImage?.url
            ? song.coverImage.url
            : song.coverImage

        const audioUrl =
          typeof song.audioFile === 'object' && song.audioFile?.url
            ? song.audioFile.url
            : song.audioFile

        return (
          <FeaturedSongCard
            key={song.id}
            id={song.id}
            title={song.title}
            coverUrl={coverUrl}
            audioUrl={audioUrl}
            durationLabel={song.duration}
          />
        )
      })}
    </CardCarousel>
  )
}
