import { getSiteVersion } from '@/lib/siteVersion'

export const dynamic = 'force-dynamic'

export const GET = async (request: Request) => {
  const version = await getSiteVersion()
  return Response.json({ version })
}
