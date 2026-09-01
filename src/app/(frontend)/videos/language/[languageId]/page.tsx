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

  const [{ docs: videoCategories }, { docs: channels }, { docs: languageDocs }] = await Promise.all(
    [
      payload.find({
        collection: 'video-categories',
        sort: 'name',
        limit: 1000,
      }),
      payload.find({
        collection: 'channels',
        sort: 'name',
        limit: 1000,
      }),
      payload.find({
        collection: 'languages',
        where: { slug: { equals: languageId } },
        limit: 1,
      }),
    ],
  )

  const categoryOptions =
    (videoCategories.length
      ? videoCategories.map((item: any) => item?.name).filter(Boolean)
      : (homepage?.videoFilters?.categoryOptions || [])
          .map((item: any) => item?.label)
          .filter(Boolean)) || []
  const channelOptions =
    (channels.length
      ? channels.map((item: any) => item?.name).filter(Boolean)
      : (homepage?.videoFilters?.channelOptions || [])
          .map((item: any) => item?.label)
          .filter(Boolean)) || []

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

  const normalizeVideoValue = (value: unknown): string | undefined => {
    if (Array.isArray(value)) {
      const result = value
        .map((item) => {
          if (typeof item === 'object' && item) {
            const maybeLabel =
              'label' in item ? String((item as { label?: string }).label || '').trim() : ''
            const maybeName =
              'name' in item ? String((item as { name?: string }).name || '').trim() : ''
            const maybeTitle =
              'title' in item ? String((item as { title?: string }).title || '').trim() : ''

            return maybeLabel || maybeName || maybeTitle
          }

          return typeof item === 'string' ? item.trim() : ''
        })
        .filter(Boolean)

      return result[0]
    }

    if (typeof value === 'object' && value) {
      const maybeLabel =
        'label' in value ? String((value as { label?: string }).label || '').trim() : ''
      const maybeName =
        'name' in value ? String((value as { name?: string }).name || '').trim() : ''
      const maybeTitle =
        'title' in value ? String((value as { title?: string }).title || '').trim() : ''

      return maybeLabel || maybeName || maybeTitle || undefined
    }

    if (typeof value === 'string') {
      return value.trim() || undefined
    }

    return undefined
  }

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
            category: normalizeVideoValue(video.category),
            channel: normalizeVideoValue(video.channel),
            languageSlug: typeof video.languageCategory === 'object' ? video.languageCategory?.slug : language.slug,
            languageTitle:
              (typeof video.languageCategory === 'object' && (video.languageCategory?.title || video.languageCategory?.name)) ||
              languages.find((l: any) => l.id === (typeof video.languageCategory === 'object' ? video.languageCategory?.id : video.languageCategory))?.title ||
              language.title,
          }))}
          languages={languages.map((lang: any) => ({
            id: String(lang.id),
            title: lang.title,
            slug: lang.slug,
            image: getMediaUrl(lang.image),
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
