'use client'

import { Pause, Play } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

type Props = {
  id: string
  title: string
  coverUrl?: string
  audioUrl?: string
  durationLabel?: string
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function FeaturedSongCard({ id, title, coverUrl, audioUrl, durationLabel }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onEnded = () => setIsPlaying(false)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
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

  const progressMax = duration > 0 ? duration : 1
  const displayDuration = duration > 0 ? formatTime(duration) : durationLabel || '0:00'

  return (
    <article className="w-full overflow-hidden rounded-xl bg-stone-900">
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        {coverUrl && <img src={coverUrl} alt={title} className="h-full w-full object-cover" />}
        {audioUrl ? (
          <button
            type="button"
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            onClick={togglePlayback}
            className="absolute left-3 top-3 text-white/90 transition-colors hover:text-yellow-400"
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" />
            )}
          </button>
        ) : (
          <span className="absolute left-3 top-3 text-xl text-white/90" aria-hidden="true">
            ♪
          </span>
        )}
      </div>
      <div className="min-h-[94px] p-4">
        <Link href={`/songs/${id}`} className="block text-white font-medium hover:text-yellow-400">
          <h3>{title}</h3>
        </Link>
        {audioUrl && (
          <div className="mt-2">
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
            <div className="mt-1 flex justify-between text-[10px] text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{displayDuration}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
