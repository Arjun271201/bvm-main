'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function LiveReloader({ initialVersion }: { initialVersion: number }) {
  const router = useRouter()
  const versionRef = useRef(initialVersion)

  useEffect(() => {
    let isMounted = true

    const interval = setInterval(async () => {
      if (!navigator.onLine) return

      try {
        const res = await fetch('/api/site-version', { cache: 'no-store' })
        if (!isMounted || !res.ok) return

        const data = await res.json()
        if (data.version && data.version > versionRef.current) {
          versionRef.current = data.version
          router.refresh()
        }
      } catch {
        // Ignore transient dev-server/network hiccups while the app is reloading.
      }
    }, 4000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [router])

  return null
}
