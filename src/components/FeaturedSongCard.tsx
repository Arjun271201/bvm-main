'use client'

import { FastForward, Pause, Play, Rewind } from 'lucide-react'
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

  const skipTime = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    const nextTime = Math.max(0, Math.min(duration || 0, audio.currentTime + seconds))
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const progressMax = duration > 0 ? duration : 1
  const displayDuration = duration > 0 ? formatTime(duration) : durationLabel || '0:00'

  return (
    <article className="group w-full overflow-hidden rounded-xl bg-[#3a0a0a] flex flex-col justify-between h-full">
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        {coverUrl && (
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-3 flex flex-col flex-1 justify-between">
        <Link href={`/songs/${id}`} className="block text-white font-medium group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1 mb-1.5">
          <h3 className="text-sm font-semibold">{title}</h3>
        </Link>
        {audioUrl ? (
          <div className="mt-auto">
            <audio ref={audioRef} preload="metadata" src={audioUrl} />

            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max={progressMax}
              step="0.1"
              value={Math.min(currentTime, progressMax)}
              onChange={handleSeek}
              aria-label={`Seek ${title}`}
              className="h-1 w-full cursor-pointer accent-yellow-500 rounded-lg"
            />

            {/* Time labels */}
            <div className="mt-0.5 flex justify-between text-[10px] text-stone-300 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{displayDuration}</span>
            </div>

            {/* Audio Controls (Rewind, Play/Pause, Fast Forward) */}
            <div className="mt-2 flex items-center justify-center gap-6 text-white">
              <button
                type="button"
                aria-label="Skip back 10 seconds"
                onClick={() => skipTime(-10)}
                className="text-white hover:text-yellow-400 transition-colors p-1"
              >
                <Rewind size={18} fill="currentColor" />
              </button>

              <button
                type="button"
                aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
                onClick={togglePlayback}
                className="text-white hover:text-yellow-400 hover:scale-110 transition-all p-1"
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </button>

              <button
                type="button"
                aria-label="Skip forward 10 seconds"
                onClick={() => skipTime(10)}
                className="text-white hover:text-yellow-400 transition-colors p-1"
              >
                <FastForward size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-auto text-xs text-stone-400 italic">No audio preview</div>
        )}
      </div>
    </article>
  )
}
