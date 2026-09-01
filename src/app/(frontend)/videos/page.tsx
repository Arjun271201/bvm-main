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

  // Calculate video count for each language
  const languagesWithCounts = languages
    .map((language: any) => ({
      ...language,
      videoCount: videos.filter(
        (video: any) =>
          (typeof video.languageCategory === 'object'
            ? video.languageCategory?.id
            : video.languageCategory) === language.id,
      ).length,
    }))
    .filter((language: any) => language.videoCount > 0)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-14 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1250px]">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-yellow-500">
            Home / Videos
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Explore Videos</h1>
          <p className="mt-4 max-w-2xl text-base text-stone-400">
            Discover spiritual teachings, wisdom, and sacred stories. Select a language to explore
            our collection of videos and start your journey.
          </p>
        </div>

        {/* Language Cards */}
        <VideosLanguageCards languages={languagesWithCounts} />
      </div>
    </main>
  )
}
