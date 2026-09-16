'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbContextType = {
  breadcrumbs: BreadcrumbItem[] | null
  setBreadcrumbs: (items: BreadcrumbItem[] | null) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbs: null,
  setBreadcrumbs: () => {},
})

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | null>(null)

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext)
}

export function SetBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { setBreadcrumbs } = useBreadcrumb()

  useEffect(() => {
    setBreadcrumbs(items)
    return () => {
      setBreadcrumbs(null)
    }
  }, [JSON.stringify(items), setBreadcrumbs])

  return null
}
