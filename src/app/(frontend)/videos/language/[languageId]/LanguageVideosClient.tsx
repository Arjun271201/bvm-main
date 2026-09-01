'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Play, CalendarDays, Video, ChevronDown, Clock, Globe } from 'lucide-react'

type VideoDoc = {
  id: string
  title: string
  description?: string
  thumbnail: any
  videoType: 'youtube' | 'upload'
  youtubeUrl?: string
  videoFile?: any
  duration?: string
  publishedDate?: string
  featured?: boolean
  category?: string
  channel?: string
  languageSlug?: string
  languageTitle?: string
}

type Language = {
  id: string | number
  title: string
  slug: string
  image?: string
}

type Props = {
  initialVideos: VideoDoc[]
  languages: Language[]
  categoryOptions?: string[]
  channelOptions?: string[]
  currentLanguageSlug: string
  currentLanguageTitle: string
  currentLanguageImage?: string
}

const DEFAULT_CATEGORIES = [
  'Lectures & Seminars',
  'Bhajans & Kirtans',
  'Documentaries & Movies',
  'Shorts & Reels',
  'Interviews & Dialogues',
]

const DEFAULT_CHANNELS = ['Srila Prabhupada Lectures', 'BVM Devotional Music', 'BVM Main Channel']

const CATEGORY_RULES = [
  { keywords: ['lecture', 'seminar', 'teaching', 'teachings', 'gita', 'scripture', 'wisdom'] },
  { keywords: ['bhajan', 'kirtan', 'song', 'singing', 'devotional'] },
  { keywords: ['documentary', 'movie', 'film', 'series', 'documentaries'] },
  { keywords: ['short', 'reel', 'status', 'clip'] },
  { keywords: ['interview', 'dialogue', 'qa', 'q&a', 'conversation'] },
]

const CHANNEL_RULES = [
  { keywords: ['prabhupada', 'srila prabhupada'] },
  { keywords: ['bhajan', 'kirtan', 'music', 'song', 'devotional'] },
  { keywords: ['main channel', 'main', 'bvm'] },
]

const ITEMS_PER_PAGE = 15

export function normalizeText(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }

  return value.toLowerCase().trim()
}

function getMediaUrl(media: unknown) {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as { url?: string }).url
  }
  return typeof media === 'string' ? media : undefined
}

export default function LanguageVideosClient({
  initialVideos,
  languages,
  categoryOptions = DEFAULT_CATEGORIES,
  channelOptions = DEFAULT_CHANNELS,
  currentLanguageSlug,
  currentLanguageTitle,
  currentLanguageImage,
}: Props) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguageSlug)
  const [activePage, setActivePage] = useState(1)

  const categoryList = useMemo(
    () => (categoryOptions.length ? categoryOptions : DEFAULT_CATEGORIES),
    [categoryOptions],
  )
  const channelList = useMemo(
    () => (channelOptions.length ? channelOptions : DEFAULT_CHANNELS),
    [channelOptions],
  )

  const mappedVideos = useMemo(() => {
    return initialVideos.map((video) => {
      const text = `${normalizeText(video.title)} ${normalizeText(video.description)}`

      const matchedCategoryIndex = CATEGORY_RULES.findIndex((rule) =>
        rule.keywords.some((keyword) => text.includes(keyword)),
      )
      const rawCategory = video.category ? video.category.trim() : ''
      const category =
        rawCategory ||
        (matchedCategoryIndex >= 0 && categoryList[matchedCategoryIndex]
          ? categoryList[matchedCategoryIndex]
          : categoryList[0] || DEFAULT_CATEGORIES[0])

      const matchedChannelIndex = CHANNEL_RULES.findIndex((rule) =>
        rule.keywords.some((keyword) => text.includes(keyword)),
      )
      const rawChannel = video.channel ? video.channel.trim() : ''
      const channel =
        rawChannel ||
        (matchedChannelIndex >= 0 && channelList[matchedChannelIndex]
          ? channelList[matchedChannelIndex]
          : channelList[0] || DEFAULT_CHANNELS[0])

      const languageTitle =
        video.languageTitle ||
        languages.find((l) => l.slug === video.languageSlug)?.title

      return { ...video, category, channel, languageTitle }
    })
  }, [initialVideos, categoryList, channelList])

  const filteredVideos = useMemo(() => {
    return mappedVideos.filter((video) => {
      const normalizedSearch = normalizeText(searchVal)
      const matchesSearch =
        !normalizedSearch ||
        normalizeText(video.title).includes(normalizedSearch) ||
        normalizeText(video.description).includes(normalizedSearch)

      const matchesCategory =
        selectedCategory === 'all' ||
        normalizeText(video.category) === normalizeText(selectedCategory)

      const matchesChannel =
        selectedChannel === 'all' ||
        normalizeText(video.channel) === normalizeText(selectedChannel)

      const matchesLanguage =
        selectedLanguage === 'all' ||
        !video.languageSlug ||
        video.languageSlug === selectedLanguage

      return matchesSearch && matchesCategory && matchesChannel && matchesLanguage
    })
  }, [mappedVideos, searchVal, selectedCategory, selectedChannel, selectedLanguage])

  useEffect(() => {
    setActivePage(1)
  }, [searchVal, selectedCategory, selectedChannel, selectedLanguage])

  const featuredVideos = useMemo(
    () => filteredVideos.filter((video) => video.featured),
    [filteredVideos],
  )

  const remainingVideos = useMemo(
    () => filteredVideos.filter((video) => !video.featured),
    [filteredVideos],
  )

  const totalItems = remainingVideos.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const paginatedVideos = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE
    return remainingVideos.slice(start, start + ITEMS_PER_PAGE)
  }, [remainingVideos, activePage])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchVal(search)
  }

  const handleClearFilters = () => {
    setSearch('')
    setSearchVal('')
    setSelectedCategory('all')
    setSelectedChannel('all')
    setSelectedLanguage('all')
    setActivePage(1)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    setSelectedLanguage(slug)
  }

  const activeLanguageDoc = languages.find((l) => l.slug === selectedLanguage)
  const displayLanguageTitle =
    selectedLanguage === 'all'
      ? 'All Languages'
      : activeLanguageDoc?.title || currentLanguageTitle

  const bannerImage =
    (selectedLanguage !== 'all' && activeLanguageDoc?.image) ||
    (selectedLanguage === 'all'
      ? getMediaUrl(initialVideos[0]?.thumbnail) || currentLanguageImage || '/images/default-language.jpg'
      : activeLanguageDoc?.image || currentLanguageImage || getMediaUrl(initialVideos[0]?.thumbnail) || '/images/default-language.jpg')

  return (
    <div className="w-full">
      <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d5aa6d]">
        <Link href="/" className="hover:text-[#f1c98d]">
          Home
        </Link>{' '}
        /{' '}
        <Link href="/videos" className="hover:text-[#f1c98d]">
          Videos
        </Link>{' '}
        / <span className="text-white">{displayLanguageTitle}</span>
      </div>

      <div className="relative mb-8 overflow-hidden rounded-[22px] border border-[#d9b785]/30 bg-[radial-gradient(circle_at_top_left,_rgba(187,105,33,0.68),_rgba(40,24,17,0.98)_48%,_rgba(19,13,9,1)_100%)] shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
        <div className="grid md:grid-cols-[330px_minmax(0,1fr)]">
          <div className="relative min-h-[220px] bg-[#24160f] md:min-h-[280px]">
            <img
              src={bannerImage}
              alt={displayLanguageTitle}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#23140d]/65 via-[#23140d]/20 to-transparent" />
          </div>

          <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c58d]">
              Sacred Stories, Timeless Teachings
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              {displayLanguageTitle}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-[#f5e8d2]/80 md:text-base">
              Explore {filteredVideos.length} spiritual videos, teachings, and uplifting content{' '}
              {selectedLanguage === 'all' ? 'across all languages' : `in ${displayLanguageTitle}`}.
            </p>

          </div>
        </div>
      </div>

      <div className="mb-8 rounded-[18px] border border-[#d5b38a]/30 bg-[#1a120e]/80 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col gap-4 lg:flex-row lg:items-end"
        >
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[180px]">
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7c4aa]">
                Channel
              </label>
              <div className="relative">
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className="w-full appearance-none rounded-[10px] border border-[#e9d5b3]/70 bg-transparent px-3 py-3 pr-9 text-sm text-[#f3e4d0] outline-none"
                >
                  <option value="all" className="bg-[#1b120d] text-white">
                    Select Channel
                  </option>
                  {channelList.map((ch) => (
                    <option key={ch} value={ch} className="bg-[#1b120d] text-white">
                      {ch}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#f8d7a7]"
                />
              </div>
            </div>

            <div className="min-w-[200px]">
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7c4aa]">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none rounded-[10px] border border-[#e9d5b3]/70 bg-transparent px-3 py-3 pr-9 text-sm text-[#f3e4d0] outline-none"
                >
                  <option value="all" className="bg-[#1b120d] text-white">
                    All Categories
                  </option>
                  {categoryList.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#1b120d] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#f8d7a7]"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[220px]">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7c4aa]">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b88a]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for wisdom..."
                className="w-full rounded-[16px] border border-[#e9d5b3]/70 bg-transparent py-3 pl-10 pr-4 text-sm text-white placeholder:text-[#e9d5b3]/60 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-[16px] bg-[#c5692f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d67b39]"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-[16px] border border-[#e9d5b3]/70 bg-transparent px-4 py-3 text-sm font-medium text-[#f5e7d3] transition hover:bg-white/5"
            >
              Clear Filters
            </button>
          </div>

          <div className="min-w-[180px] lg:ml-auto">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d7c4aa]">
              Language
            </label>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="w-full appearance-none rounded-[16px] border border-[#e9d5b3]/70 bg-transparent py-3 pl-10 pr-9 text-sm font-medium text-[#f7d9aa] outline-none"
              >
                <option value="all" className="bg-[#1b120d] text-white">
                  All Languages
                </option>
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.slug} className="bg-[#1b120d] text-white">
                    {lang.title}
                  </option>
                ))}
              </select>
              <Globe
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#f2d29e]"
              />
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#f2d29e]"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-2xl font-semibold text-white">Latest Uploads</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-[#d59b49] to-transparent" />
      </div>

      {featuredVideos.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-white">Featured Videos</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#d59b49] to-transparent" />
          </div>

          <div className="mb-4 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {featuredVideos.map((video) => {
              const thumbnailUrl = getMediaUrl(video.thumbnail)
              const publishedDate = video.publishedDate
                ? new Date(video.publishedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : null

              return (
                <Link
                  key={video.id}
                  href={`/videos/${video.id}`}
                  className="group overflow-hidden rounded-[18px] border border-[#f1d7b1]/10 bg-[#1a120d]/80 shadow-[0_18px_30px_rgba(0,0,0,0.18)] transition hover:border-[#ecb66f]/50"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#24160f]">
                    {thumbnailUrl && (
                      <img
                        src={thumbnailUrl}
                        alt={video.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a120d] shadow-lg transition group-hover:scale-105">
                        <Play size={18} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold tracking-wide text-white">
                        {video.duration}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                      {video.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#d9c4a6]">
                      {video.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold tracking-wide">
                      <span className="rounded bg-[#ecb66f]/15 px-2 py-0.5 uppercase text-[#ecb66f]">
                        {video.category}
                      </span>
                      {video.channel && (
                        <span className="rounded bg-[#d88d45]/20 px-2 py-0.5 text-[#f5d0a0]">
                          {video.channel}
                        </span>
                      )}
                      {video.languageTitle && (
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
                          {video.languageTitle}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-[#d7c4aa]">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={10} /> {publishedDate}
                      </span>
                      <span>150 views</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {paginatedVideos.length > 0 ? (
        <div className="mb-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {paginatedVideos.map((video) => {
            const thumbnailUrl = getMediaUrl(video.thumbnail)
            const publishedDate = video.publishedDate
              ? new Date(video.publishedDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : null

            return (
              <Link
                key={video.id}
                href={`/videos/${video.id}`}
                className="group overflow-hidden rounded-[18px] border border-[#f1d7b1]/10 bg-[#1a120d]/80 shadow-[0_16px_26px_rgba(0,0,0,0.18)] transition hover:border-[#ecb66f]/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#24160f]">
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/25 opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a120d] shadow-lg">
                      <Play size={18} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  {video.duration && (
                    <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/75 px-2 py-1 text-[10px] font-semibold tracking-wide text-white">
                      <Clock size={10} /> {video.duration}
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                    {video.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#d9c4a6]">
                    {video.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold tracking-wide">
                    <span className="rounded bg-[#ecb66f]/15 px-2 py-0.5 uppercase text-[#ecb66f]">
                      {video.category}
                    </span>
                    {video.channel && (
                      <span className="rounded bg-[#d88d45]/20 px-2 py-0.5 text-[#f5d0a0]">
                        {video.channel}
                      </span>
                    )}
                    {video.languageTitle && (
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
                        {video.languageTitle}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-[#d7c4aa]">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={10} /> {publishedDate}
                    </span>
                    <span>150 views</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="mb-12 rounded-[18px] border border-[#e9d5b3]/20 bg-[#1a120e]/70 p-12 text-center">
          <Video size={46} className="mx-auto mb-4 text-[#d7c4aa]/75" />
          <p className="text-lg font-medium text-white">No videos match your search</p>
          <p className="mt-2 text-sm text-[#d7c4aa]">
            Try clearing filters or using a different keyword.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-5 rounded-full bg-[#c5692f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d67b39]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#d7c4aa] sm:flex-row">
          <div>
            Showing{' '}
            <span className="font-semibold text-white">
              {Math.min(totalItems, (activePage - 1) * ITEMS_PER_PAGE + 1)}-
              {Math.min(totalItems, activePage * ITEMS_PER_PAGE)}
            </span>{' '}
            of <span className="font-semibold text-white">{totalItems}</span> videos
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className="rounded-lg border border-[#e9d5b3]/30 bg-transparent px-3 py-1.5 text-sm text-[#f1e6d3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm ${
                    activePage === page
                      ? 'border-[#d59b49] bg-[#d59b49] font-semibold text-[#1b120d]'
                      : 'border-[#e9d5b3]/30 bg-transparent text-[#f1e6d3]'
                  }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className="rounded-lg border border-[#e9d5b3]/30 bg-transparent px-3 py-1.5 text-sm text-[#f1e6d3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
