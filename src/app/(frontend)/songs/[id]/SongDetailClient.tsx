'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Play,
  Pause,
  Share2,
  Plus,
  Download,
  Printer,
  FileText,
  Check,
  Music,
  Clock,
} from 'lucide-react'

type SongDoc = {
  id: string
  title: string
  artist?: string
  authorName?: string
  coverUrl?: string
  audioUrl?: string
  youtubeUrl?: string
  youtubeEmbedUrl?: string | null
  audioType?: 'youtube' | 'upload'
  duration?: string
  categoryTitle?: string
  languageTitle?: string
  description?: string
  lyricsDiacritics?: string
  lyricsPlain?: string
}

type Props = {
  song: SongDoc
  relatedSongs: SongDoc[]
  categories?: string[]
}

const DEFAULT_CATEGORIES = [
  'Morning Kirtan',
  'Evening Arati',
  'Bhajans',
  'Nama Sankirtana',
  'Prabhupada',
]

const DEFAULT_DIACRITICS_LYRICS = `Hare Kṛṣṇa Hare Kṛṣṇa
Kṛṣṇa Kṛṣṇa Hare Hare
Hare Rāma Hare Rāma
Rāma Rāma Hare Hare

(O energy of the Lord, O Lord, please engage me in Your service.)

Hare Kṛṣṇa Hare Kṛṣṇa
Kṛṣṇa Kṛṣṇa Hare Hare
Hare Rāma Hare Rāma
Rāma Rāma Hare Hare

(O energy of the Lord, O Lord, please engage me in Your service.)`

const DEFAULT_PLAIN_LYRICS = `Hare Krishna Hare Krishna
Krishna Krishna Hare Hare
Hare Rama Hare Rama
Rama Rama Hare Hare

(O energy of the Lord, O Lord, please engage me in Your service.)

Hare Krishna Hare Krishna
Krishna Krishna Hare Hare
Hare Rama Hare Rama
Rama Rama Hare Hare

(O energy of the Lord, O Lord, please engage me in Your service.)`

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function SongDetailClient({ song, relatedSongs, categories = DEFAULT_CATEGORIES }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'diacritics' | 'plain' | 'about'>('diacritics')
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

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
  }, [song.audioUrl])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: song.title,
          url: window.location.href,
        })
        return
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadLyrics = () => {
    const content =
      activeTab === 'plain'
        ? song.lyricsPlain || DEFAULT_PLAIN_LYRICS
        : song.lyricsDiacritics || DEFAULT_DIACRITICS_LYRICS
    const element = document.createElement('a')
    const file = new Blob([`${song.title}\n\n${content}`], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${song.title.replace(/\s+/g, '_')}_Lyrics.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const authorText = song.authorName || song.artist || 'Traditional'
  const categoryText = song.categoryTitle || 'Kirtan'

  return (
    <div className="w-full">
      {/* Top Header Row: Back Arrow & Breadcrumb */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9b785]/30 bg-[#1b120d] text-[#e5c58d] transition hover:bg-[#281810]"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#d5aa6d]">
          <Link href="/songs" className="hover:text-[#f1c98d]">
            Song Library
          </Link>{' '}
          /{' '}
          <span className="text-[#d7c4aa]">{categoryText}</span>{' '}
          / <span className="text-white">{song.title}</span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left Column: Player, Song Header, Action Buttons, Tabs & Lyrics */}
        <div className="min-w-0 space-y-6">
          {/* Media Player Card */}
          <div className="relative h-[220px] w-full overflow-hidden rounded-[20px] border border-[#d9b785]/30 bg-[#1b120d] shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:h-[270px] md:h-[300px]">
            {song.audioType === 'youtube' && song.youtubeEmbedUrl ? (
              <iframe
                src={song.youtubeEmbedUrl}
                title={song.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative h-full w-full bg-[#1b120d]">
                {song.coverUrl ? (
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="h-full w-full object-cover opacity-80"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2b1810] to-[#120b08] text-[#d5aa6d]">
                    <Music size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Big Center Overlay Play Button */}
                <button
                  onClick={togglePlayback}
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#1b120d] shadow-2xl transition hover:scale-105"
                  aria-label={isPlaying ? 'Pause song' : 'Play song'}
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>

                {/* Audio Seek Controller Bar */}
                {song.audioUrl && (
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 px-6 py-3 backdrop-blur-md">
                    <audio ref={audioRef} preload="metadata" src={song.audioUrl} />
                    <input
                      type="range"
                      min="0"
                      max={duration || 1}
                      step="0.1"
                      value={Math.min(currentTime, duration || 1)}
                      onChange={(e) => {
                        if (audioRef.current) {
                          audioRef.current.currentTime = Number(e.target.value)
                          setCurrentTime(Number(e.target.value))
                        }
                      }}
                      className="h-1.5 w-full cursor-pointer accent-[#c5692f]"
                    />
                    <div className="mt-1 flex items-center justify-between text-[11px] font-medium text-[#d7c4aa]">
                      <span>{formatTime(currentTime)}</span>
                      <span>{duration > 0 ? formatTime(duration) : song.duration || '0:00'}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Song Meta Header & Quick Action Buttons */}
          <div className="flex flex-col gap-4 border-b border-[#d5b38a]/20 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {song.title}
              </h1>

              <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-xs text-[#d7c4aa]">
                <span>
                  Author: <strong className="font-semibold text-white">{authorText}</strong>
                </span>
                <span className="text-white/20">•</span>
                <span className="rounded bg-[#ecb66f]/15 px-2 py-0.5 text-[10px] font-bold uppercase text-[#ecb66f]">
                  {categoryText}
                </span>
                <span className="text-white/20">•</span>
                <span>12k Plays</span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {song.duration || '5:15'}
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-full border border-[#e9d5b3]/40 bg-white/5 px-4 py-2 text-xs font-semibold text-[#f5e7d3] transition hover:bg-white/10"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                className="flex items-center gap-1.5 rounded-full border border-[#e9d5b3]/40 bg-white/5 px-4 py-2 text-xs font-semibold text-[#f5e7d3] transition hover:bg-white/10"
              >
                <Plus size={14} />
                <span>Playlist</span>
              </button>

              {song.audioUrl && (
                <a
                  href={song.audioUrl}
                  download
                  className="flex items-center gap-1.5 rounded-full bg-[#c5692f] px-5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#d67b39]"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
              )}
            </div>
          </div>

          {/* Interactive Tabs (Diacritics, Non-Diacritics, About) */}
          <div className="rounded-[20px] border border-[#d9b785]/20 bg-[#1a120e]/90 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.25)]">
            <div className="mb-6 flex border-b border-[#d5b38a]/20">
              <button
                onClick={() => setActiveTab('diacritics')}
                className={`pb-3 pr-6 text-sm font-semibold transition ${
                  activeTab === 'diacritics'
                    ? 'border-b-2 border-[#d76d2d] text-[#f2c291]'
                    : 'text-[#d7c4aa]/70 hover:text-white'
                }`}
              >
                Lyrics with Diacritics
              </button>
              <button
                onClick={() => setActiveTab('plain')}
                className={`pb-3 px-6 text-sm font-semibold transition ${
                  activeTab === 'plain'
                    ? 'border-b-2 border-[#d76d2d] text-[#f2c291]'
                    : 'text-[#d7c4aa]/70 hover:text-white'
                }`}
              >
                Lyrics without Diacritics
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-3 px-6 text-sm font-semibold transition ${
                  activeTab === 'about'
                    ? 'border-b-2 border-[#d76d2d] text-[#f2c291]'
                    : 'text-[#d7c4aa]/70 hover:text-white'
                }`}
              >
                About Song
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'diacritics' && (
              <div className="space-y-6 text-[#f5e8d2]">
                <div className="border-l-2 border-[#d76d2d] pl-4 space-y-1">
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Hare Kṛṣṇa Hare Kṛṣṇa
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Kṛṣṇa Kṛṣṇa Hare Hare
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Hare Rāma Hare Rāma
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Rāma Rāma Hare Hare
                  </p>
                  <p className="pt-2 text-xs italic text-[#d7c4aa]">
                    O energy of the Lord, O Lord, please engage me in Your service.
                  </p>
                </div>

                <div className="border-l-2 border-[#d76d2d] pl-4 space-y-1 pt-2">
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Hare Kṛṣṇa Hare Kṛṣṇa
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Kṛṣṇa Kṛṣṇa Hare Hare
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Hare Rāma Hare Rāma
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#f2c291]">
                    Rāma Rāma Hare Hare
                  </p>
                  <p className="pt-2 text-xs italic text-[#d7c4aa]">
                    O energy of the Lord, O Lord, please engage me in Your service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'plain' && (
              <div className="space-y-6 text-[#f5e8d2]">
                <div className="border-l-2 border-[#d5aa6d] pl-4 space-y-1">
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Hare Krishna Hare Krishna
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Krishna Krishna Hare Hare
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Hare Rama Hare Rama
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Rama Rama Hare Hare
                  </p>
                  <p className="pt-2 text-xs italic text-[#d7c4aa]">
                    O energy of the Lord, O Lord, please engage me in Your service.
                  </p>
                </div>

                <div className="border-l-2 border-[#d5aa6d] pl-4 space-y-1 pt-2">
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Hare Krishna Hare Krishna
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Krishna Krishna Hare Hare
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Hare Rama Hare Rama
                  </p>
                  <p className="font-serif text-lg font-bold leading-relaxed text-[#e5c58d]">
                    Rama Rama Hare Hare
                  </p>
                  <p className="pt-2 text-xs italic text-[#d7c4aa]">
                    O energy of the Lord, O Lord, please engage me in Your service.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4 text-sm text-[#f5e8d2]/90 leading-relaxed">
                <p>
                  {song.description ||
                    `Discover the transcendent vibrations of ${song.title}. Composed with deep devotion, this transcendental chant awakens spontaneous love for the Supreme Lord.`}
                </p>
                <p className="text-xs text-[#d7c4aa]">
                  Performed by: <span className="text-white font-medium">{authorText}</span>
                </p>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#d5b38a]/15 pt-5">
              <button
                onClick={handleDownloadLyrics}
                className="flex items-center gap-2 rounded-full bg-[#c5692f] px-5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#d67b39]"
              >
                <FileText size={14} />
                <span>Download Lyrics PDF</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-full border border-[#e9d5b3]/40 bg-white/5 px-4 py-2 text-xs font-semibold text-[#f5e7d3] transition hover:bg-white/10"
              >
                <Printer size={14} />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar (Related Songs & More Categories) */}
        <div className="space-y-6">
          {/* Related Songs Card */}
          <div className="rounded-[20px] border border-[#d9b785]/20 bg-[#1a120e]/90 p-5 shadow-[0_16px_36px_rgba(0,0,0,0.25)]">
            <div className="mb-4 flex items-center justify-between border-b border-[#d5b38a]/15 pb-3">
              <h3 className="text-lg font-semibold text-white">Related Songs</h3>
              <Link href="/songs" className="text-xs font-medium text-[#d5aa6d] hover:text-[#f1c98d]">
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {relatedSongs.length > 0 ? (
                relatedSongs.map((relSong) => (
                  <Link
                    key={relSong.id}
                    href={`/songs/${relSong.id}`}
                    className="group flex items-center justify-between gap-3 rounded-xl p-2 transition hover:bg-white/5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-[#24160f]">
                        {relSong.coverUrl ? (
                          <img
                            src={relSong.coverUrl}
                            alt={relSong.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#d5aa6d]">
                            <Music size={16} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate text-xs font-semibold text-white group-hover:text-[#f1c98d]">
                          {relSong.title}
                        </h4>
                        <p className="truncate text-[10px] text-[#d7c4aa]/75">
                          {relSong.authorName || relSong.artist || 'Traditional'}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-medium text-[#d7c4aa]">
                      {relSong.duration || '5:32'}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="py-4 text-center text-xs text-[#d7c4aa]">No related songs found.</div>
              )}
            </div>
          </div>

          {/* More Categories Card */}
          <div className="rounded-[20px] border border-[#d9b785]/20 bg-[#1a120e]/90 p-5 shadow-[0_16px_36px_rgba(0,0,0,0.25)]">
            <h3 className="mb-4 border-b border-[#d5b38a]/15 pb-3 text-lg font-semibold text-white">
              More Categories
            </h3>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/songs?category=${encodeURIComponent(cat)}`}
                  className="rounded-full border border-[#e9d5b3]/30 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#f5e7d3] transition hover:border-[#d5aa6d] hover:bg-[#c5692f]/20 hover:text-[#f1c98d]"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
