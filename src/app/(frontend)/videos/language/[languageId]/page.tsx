import { getPayload } from 'payload'
import config from '@/payload.config'
import LanguageVideosClient from './LanguageVideosClient'

type Props = {
  params: Promise<{ languageId: string }>
  searchParams: Promise<{ sort?: string }>
}

function getMediaUrl(media: unknown) {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return (media as { url?: string }).url
  }
  return typeof media === 'string' ? media : undefined
}

export default async function LanguageVideosPage({ params, searchParams }: Props) {
  const { languageId } = await params
  const { sort = 'latest' } = await searchParams

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepage = await payload.findGlobal({ slug: 'homepage' })
  const categoryOptions =
    (homepage?.videoFilters?.categoryOptions || [])
      .map((item: any) => item?.label)
      .filter(Boolean) || []
  const channelOptions =
    (homepage?.videoFilters?.channelOptions || [])
      .map((item: any) => item?.label)
      .filter(Boolean) || []

  const { docs: languageDocs } = await payload.find({
    collection: 'languages',
    where: { slug: { equals: languageId } },
    limit: 1,
  })

  if (!languageDocs.length) {
    return (
      <main className="min-h-screen bg-stone-950 px-6 py-14 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1250px]">
          <p className="text-center text-stone-400">Language not found</p>
        </div>
      </main>
    )
  }

  const language = languageDocs[0]

  const [{ docs: videos }, { docs: languages }] = await Promise.all([
    payload.find({
      collection: 'videos',
      where: {
        languageCategory: { equals: language.id },
      },
      sort: sort === 'oldest' ? 'publishedDate' : '-publishedDate',
      limit: 1000,
      depth: 1,
    }),
    payload.find({
      collection: 'languages',
      sort: 'title',
      limit: 100,
    }),
  ])

  const languageImage = getMediaUrl(language.image)

  return (
    <main className="min-h-screen bg-[#130d09] px-4 py-6 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <LanguageVideosClient
          initialVideos={videos.map((video: any) => ({
            id: String(video.id),
            title: video.title,
            description: video.description,
            thumbnail: video.thumbnail,
            videoType: video.videoType || 'youtube',
            youtubeUrl: video.youtubeUrl,
            videoFile: video.videoFile,
            duration: video.duration,
            publishedDate: video.publishedDate,
            featured: Boolean(video.featured),
            category:
              typeof video.category === 'object' && video.category
                ? video.category.title || video.category.name
                : video.category || undefined,
            channel: video.channel || undefined,
          }))}
          languages={languages.map((lang: any) => ({
            id: String(lang.id),
            title: lang.title,
            slug: lang.slug,
          }))}
          categoryOptions={categoryOptions}
          channelOptions={channelOptions}
          currentLanguageSlug={language.slug}
          currentLanguageTitle={language.title}
          currentLanguageImage={languageImage}
        />
      </div>
    </main>
  )
}
