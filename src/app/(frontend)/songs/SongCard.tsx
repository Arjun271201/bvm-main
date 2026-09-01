'use client'

import Link from 'next/link'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

type Props = {
  id: string
  title: string
  artist?: string
  coverUrl?: string
  audioUrl?: string
  durationLabel?: string
  compact?: boolean
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function SongCard({
  id,
  title,
  artist,
  coverUrl,
  audioUrl,
  durationLabel,
  compact = false,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const nextTime = Number(event.target.value)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const displayDuration = duration > 0 ? formatTime(duration) : durationLabel || '0:00'
  const progressMax = duration > 0 ? duration : 1

  if (compact) {
    return (
      <article className="flex items-center justify-between gap-3 border-b border-[#d9b594]/30 py-2.5 last:border-b-0">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-md border border-[#d9b594]/20 bg-stone-800">
            {coverUrl ? (
              <img src={coverUrl} alt={title} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div className="min-w-0">
            <Link
              href={`/songs/${id}`}
              className="block truncate text-base font-medium text-[#f2e6d8] hover:text-[#f3c98d]"
            >
              {title}
            </Link>
            {artist && <p className="truncate text-sm text-stone-400">{artist}</p>}
          </div>
        </div>

        <Link
          href={`/songs/${id}`}
          aria-label={`Open ${title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7783d] text-white transition hover:bg-[#c86832]"
        >
          <Play size={16} fill="currentColor" />
        </Link>
      </article>
    )
  }

  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-stone-900 shadow-2xl">
      <div className="relative aspect-video overflow-hidden bg-black">
        {coverUrl && <img src={coverUrl} alt={title} className="h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <Link
          href={`/songs/${id}`}
          aria-label={`Open ${title}`}
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-500 text-stone-950 shadow-lg transition-transform hover:scale-105"
        >
          <Play size={22} fill="currentColor" />
        </Link>
      </div>
      <div className="p-4">
        <Link href={`/songs/${id}`} className="block hover:text-yellow-400">
          <h3 className="line-clamp-2 font-medium">{title}</h3>
        </Link>
        {artist && <p className="mt-2 text-sm text-stone-400">{artist}</p>}
        {audioUrl && (
          <div className="mt-3">
            <audio ref={audioRef} preload="metadata" src={audioUrl} />
            <input
              type="range"
              min="0"
              max={progressMax}
              step="0.1"
              value={Math.min(currentTime, progressMax)}
              onChange={handleSeek}
              aria-label={`Seek ${title}`}
              className="h-1 w-full cursor-pointer accent-yellow-500"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-stone-500">
              <span>{formatTime(currentTime)}</span>
              <span>{displayDuration}</span>
            </div>
          </div>
        )}
        {!audioUrl && (
          <p className="mt-3 inline-flex items-center gap-1 text-xs text-stone-500">
            <RotateCcw size={12} aria-hidden="true" /> Open to listen
          </p>
        )}
      </div>
    </article>
  )
}
