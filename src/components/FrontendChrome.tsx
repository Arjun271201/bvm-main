'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import DarkHeader from './Header'
import DarkFooter from './Footer'
import SupportBVM from './SupportBVM'
import LightHeader from '@/app/(frontend)/light/components/Header'

export default function FrontendChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLightTheme = pathname === '/light'
  const showSupportCta = pathname !== '/' && pathname !== '/light'

  return (
    <>
      {isLightTheme ? <LightHeader /> : <DarkHeader />}
      <main>{children}</main>
      {showSupportCta && <SupportBVM variant="footer-cta" />}
      <DarkFooter />
    </>
  )
}
