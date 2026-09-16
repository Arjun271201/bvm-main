import { getPayload } from 'payload'
import config from '@/payload.config'
import VideosLanguageCards from '@/components/VideosLanguageCards'

export default async function VideosPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: languages } = await payload.find({
    collection: 'languages',
    sort: 'order',
    limit: 100,
  })

  const { docs: videos } = await payload.find({
    collection: 'videos',
    sort: '-publishedDate',
    limit: 1000,
    depth: 1,
  })

  // Calculate video count, latest video & channel count for each language
  const languagesWithCounts = languages
    .map((language: any) => {
      const langVideos = videos.filter(
        (video: any) =>
          (typeof video.languageCategory === 'object'
            ? video.languageCategory?.id
            : video.languageCategory) === language.id,
      )
      const latestVideo = langVideos[0]
      const thumbUrl =
        typeof latestVideo?.thumbnail === 'object' && latestVideo?.thumbnail?.url
          ? latestVideo.thumbnail.url
          : typeof language.image === 'object' && language.image?.url
            ? language.image.url
            : language.image

      const videoCount = langVideos.length
      const channelCount = language.channelCount ?? Math.max(1, Math.ceil(videoCount / 5))

      return {
        id: language.id,
        title: language.title,
        slug: language.slug,
        image: thumbUrl,
        videoCount,
        channelCount,
        latestVideoTitle: latestVideo?.title ? `Latest: ${latestVideo.title}` : 'Latest Upload',
      }
    })
    .filter((language: any) => language.videoCount > 0)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <main className="min-h-screen bg-[#2c0002] px-3 py-7 text-white sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-serif">
            Choose Your Language
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-stone-300">
            Select a language to explore channels, playlists, and the latest video uploads.
          </p>
        </div>

        {/* Language Cards Grid */}
        <VideosLanguageCards languages={languagesWithCounts} />

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-stone-400 font-medium tracking-wide">
          More languages coming soon...
        </div>
      </div>
    </main>
  )
}
