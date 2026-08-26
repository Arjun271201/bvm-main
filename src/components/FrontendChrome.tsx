'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import DarkHeader from './Header'
import DarkFooter from './Footer'
import LightHeader from '@/app/(frontend)/light/components/Header'

export default function FrontendChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLightTheme = pathname === '/light'

  return (
    <>
      {isLightTheme ? <LightHeader /> : <DarkHeader />}
      <main>{children}</main>
      <DarkFooter />
    </>
  )
}
