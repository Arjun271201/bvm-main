'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, RotateCcw, Play, Music } from 'lucide-react'
import SongCard from './SongCard'

type SongDoc = {
  id: string
  title: string
  artist?: string
  author?: any
  coverImage?: any
  audioFile?: any
  youtubeUrl?: string
  audioType?: 'youtube' | 'upload'
  duration?: string
  languageCategory?: any
  isRegular?: boolean
  isMantra?: boolean
  isSloka?: boolean
}

type Props = {
  initialSongs: SongDoc[]
  languages: any[]
  authors: any[]
  initialCategory?: string
  initialAuthor?: string
  initialType?: string
  initialLetter?: string
  initialQuery?: string
}

function getMediaUrl(media: unknown) {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as { url?: string }).url
  }
  return typeof media === 'string' ? media : undefined
}

function getCategoryId(category: unknown): string {
  if (typeof category === 'object' && category !== null && 'id' in category) {
    return String((category as { id: string | number }).id)
  }
  if (typeof category === 'object' && category !== null && 'slug' in category) {
    return String((category as { slug: string }).slug)
  }
  return category ? String(category) : ''
}

function getLetterFromTitle(title: string | null | undefined) {
  const value = (title ?? '').trim()
  return value ? value.charAt(0).toUpperCase() : '#'
}

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.toLowerCase().trim()
}

export default function SongsClient({
  initialSongs,
  languages,
  authors,
  initialCategory = '',
  initialAuthor = 'all',
  initialType = 'all',
  initialLetter = 'All',
  initialQuery = '',
}: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialCategory)
  const [selectedAuthor, setSelectedAuthor] = useState(initialAuthor)
  const [selectedType, setSelectedType] = useState(initialType)
  const [selectedLetter, setSelectedLetter] = useState(initialLetter)
  const [search, setSearch] = useState(initialQuery)
  const [searchVal, setSearchVal] = useState(initialQuery)

  const alphabet = useMemo(
    () => Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)),
    [],
  )
  const letterOptions = useMemo(() => ['All', ...alphabet], [alphabet])

  const filteredSongs = useMemo(() => {
    const selectedAuthorDoc = authors.find((a) => String(a.id) === String(selectedAuthor))
    const normalizedSearch = normalizeText(searchVal)

    return initialSongs.filter((song) => {
      // 1. Language Filter
      const matchesLanguage =
        !selectedLanguage ||
        selectedLanguage === 'all' ||
        getCategoryId(song.languageCategory) === selectedLanguage ||
        song.languageCategory?.slug === selectedLanguage ||
        String(song.languageCategory?.id) === selectedLanguage

      // 2. Author Filter
      const songAuthorId = getCategoryId(song.author)
      const matchesAuthor =
        !selectedAuthor ||
        selectedAuthor === 'all' ||
        songAuthorId === selectedAuthor ||
        String(song.author?.id) === selectedAuthor ||
        (selectedAuthorDoc && normalizeText(song.artist).includes(normalizeText(selectedAuthorDoc.name)))

      // 3. Type Filter
      const matchesType =
        !selectedType || selectedType === 'all'
          ? true
          : selectedType === 'regular'
          ? Boolean(song.isRegular)
          : selectedType === 'mantras'
          ? Boolean(song.isMantra)
          : selectedType === 'slokas'
          ? Boolean(song.isSloka)
          : true

      // 4. Search Filter
      const matchesSearch =
        !normalizedSearch ||
        normalizeText(song.title).includes(normalizedSearch) ||
        normalizeText(song.artist).includes(normalizedSearch) ||
        normalizeText(song.author?.name).includes(normalizedSearch)

      // 5. Letter Filter
      let matchesLetter = true
      if (selectedLetter && selectedLetter !== 'All') {
        if (selectedLetter === '#') {
          matchesLetter = !/^[A-Z]/i.test(song.title || '')
        } else {
          matchesLetter = getLetterFromTitle(song.title) === selectedLetter
        }
      }

      return matchesLanguage && matchesAuthor && matchesType && matchesSearch && matchesLetter
    })
  }, [initialSongs, selectedLanguage, selectedAuthor, selectedType, selectedLetter, searchVal, authors])

  const groupedSongs = useMemo(() => {
    return filteredSongs.reduce((groups: Record<string, SongDoc[]>, song) => {
      const letter = getLetterFromTitle(song.title)
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(song)
      return groups
    }, {})
  }, [filteredSongs])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchVal(search)
  }

  const handleClearFilters = () => {
    setSelectedLanguage('')
    setSelectedAuthor('all')
    setSelectedType('all')
    setSelectedLetter('All')
    setSearch('')
    setSearchVal('')
  }

  const currentLanguageTitle = useMemo(() => {
    if (!selectedLanguage || selectedLanguage === 'all') return 'All Languages'
    const lang = languages.find((l) => l.slug === selectedLanguage || String(l.id) === selectedLanguage)
    return lang?.title || 'Songs'
  }, [selectedLanguage, languages])

  return (
    <div className="w-full">
      {/* Header Card */}
      <div className="mb-8 overflow-hidden rounded-[30px] border border-white/10 bg-[#17130f] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        <div className="flex flex-col gap-8 px-6 py-8 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.20em] text-yellow-500">
              Home / Songs
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Song Library
            </h1>
            <p className="mt-4 max-w-xl text-base text-stone-300">
              Browse devotional music by category and discover your next favourite song.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Form Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="mb-8 overflow-hidden rounded-[18px] border border-[#d7b99c]/60 bg-[#201712] px-4 py-4 text-[#f6e6d6] shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
      >
        <div className="flex flex-wrap items-end gap-3 md:gap-4">
          {/* Language Filter */}
          <div className="relative min-w-[168px]">
            <div className="mb-2 pl-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#d7b99c]">
              Language
            </div>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="h-[46px] w-full appearance-none rounded-[10px] border border-[#d7b99c]/80 bg-[#2a1d19] px-4 pr-10 text-sm text-[#f6e6d6] outline-none shadow-[inset_0_0_0_1px_rgba(215,185,156,0.2)]"
              >
                <option value="">All Languages</option>
                {languages.map((category: any) => (
                  <option key={category.id} value={category.slug || String(category.id)}>
                    {category.title}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d7b99c]"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-full border border-[#d7b99c]/70 bg-transparent px-3.5 py-2.5 text-[#f6e6d6]">
            <Search size={16} className="text-[#d7b99c]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Title, First Line, or Author..."
              className="w-full border-none bg-transparent text-sm text-[#f6e6d6] placeholder:text-[#d7b99c]/80 focus:outline-none"
            />
          </div>

          {/* Search & Clear Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="h-[46px] rounded-full bg-[#d7783d] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#c86832]"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="h-[46px] rounded-full border border-[#d7b99c]/60 bg-transparent px-4 text-sm font-medium text-[#f6e6d6] transition hover:bg-white/5"
            >
              Clear
            </button>
          </div>

          {/* Author & Type Filter Column */}
          <div className="flex flex-col gap-2">
            <div className="relative min-w-[200px]">
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="h-[46px] w-full appearance-none rounded-[10px] border border-[#d7b99c]/80 bg-[#2a1d19] px-4 pr-10 text-sm text-[#f6e6d6] outline-none shadow-[inset_0_0_0_1px_rgba(215,185,156,0.2)]"
              >
                <option value="all">All Authors</option>
                {authors.map((author: any) => (
                  <option key={author.id} value={String(author.id)}>
                    {author.name}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d7b99c]"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {/* Radio Types */}
            <div className="flex flex-wrap gap-2">
              <label className="flex h-[40px] cursor-pointer items-center gap-2 rounded-full border border-[#d7b99c]/70 bg-transparent px-3 text-xs text-[#f6e6d6]">
                <input
                  type="radio"
                  name="type"
                  value="all"
                  checked={selectedType === 'all'}
                  onChange={() => setSelectedType('all')}
                  className="h-3.5 w-3.5 accent-[#d7783d]"
                />
                <span>All</span>
              </label>
              <label className="flex h-[40px] cursor-pointer items-center gap-2 rounded-full border border-[#d7b99c]/70 bg-transparent px-3 text-xs text-[#f6e6d6]">
                <input
                  type="radio"
                  name="type"
                  value="regular"
                  checked={selectedType === 'regular'}
                  onChange={() => setSelectedType('regular')}
                  className="h-3.5 w-3.5 accent-[#d7783d]"
                />
                <span>Regular</span>
              </label>
              <label className="flex h-[40px] cursor-pointer items-center gap-2 rounded-full border border-[#d7b99c]/70 bg-transparent px-3 text-xs text-[#f6e6d6]">
                <input
                  type="radio"
                  name="type"
                  value="mantras"
                  checked={selectedType === 'mantras'}
                  onChange={() => setSelectedType('mantras')}
                  className="h-3.5 w-3.5 accent-[#d7783d]"
                />
                <span>Mantras</span>
              </label>
              <label className="flex h-[40px] cursor-pointer items-center gap-2 rounded-full border border-[#d7b99c]/70 bg-transparent px-3 text-xs text-[#f6e6d6]">
                <input
                  type="radio"
                  name="type"
                  value="slokas"
                  checked={selectedType === 'slokas'}
                  onChange={() => setSelectedType('slokas')}
                  className="h-3.5 w-3.5 accent-[#d7783d]"
                />
                <span>Slokas</span>
              </label>
            </div>
          </div>
        </div>
      </form>

      {/* Alphabet Letter Filter Pills */}
      <div
        className="mb-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        aria-label="Filter songs by letter"
      >
        {letterOptions.map((letter) => {
          const isAll = letter === 'All'
          const isActive = isAll ? selectedLetter === 'All' : selectedLetter === letter

          return (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={`flex items-center justify-center rounded-full border text-[13px] font-medium transition-colors ${
                isActive
                  ? 'border-[#d9784a] bg-[#d9784a] text-white'
                  : 'border-[#d9784a]/30 bg-transparent text-white hover:border-[#d9784a] hover:text-[#d9784a]'
              } ${isAll ? 'h-8 px-3' : 'h-8 w-8'}`}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {/* Songs Display Section */}
      <section className="mt-4">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-white">
            {currentLanguageTitle === 'All Languages' ? 'Songs' : `${currentLanguageTitle} Songs`}
          </h2>
          <span className="rounded-full border border-white/10 bg-stone-900 px-3 py-1 text-sm text-stone-300">
            {filteredSongs.length} tracks
          </span>
        </div>

        {filteredSongs.length > 0 ? (
          <div className="space-y-6">
            {(selectedLetter && selectedLetter !== 'All'
              ? [selectedLetter]
              : Object.keys(groupedSongs)
            ).map((letter) => {
              const songsForLetter = groupedSongs[letter] ?? []

              if (!songsForLetter.length) return null

              return (
                <div key={letter}>
                  <div className="mb-3 flex items-center justify-between border-b border-[#d9b594]/30 pb-2">
                    <span className="text-lg font-semibold text-[#f4c89d]">{letter}</span>
                  </div>

                  <div className="space-y-3">
                    {songsForLetter.map((song) => {
                      const coverUrl = typeof song.coverImage === 'string' ? song.coverImage : getMediaUrl(song.coverImage)
                      const audioUrl = typeof song.audioFile === 'string' ? song.audioFile : getMediaUrl(song.audioFile)
                      return (
                        <SongCard
                          key={song.id}
                          id={song.id}
                          title={song.title}
                          artist={song.artist}
                          coverUrl={coverUrl}
                          audioUrl={audioUrl}
                          durationLabel={song.duration}
                          compact
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-[#d9784a]/40 bg-stone-900 p-8 text-center text-stone-300">
            No songs found for this filter.
            <button
              onClick={handleClearFilters}
              className="mt-4 block mx-auto rounded-full bg-[#d7783d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c86832]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
