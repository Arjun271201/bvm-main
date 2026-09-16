/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

import Script from 'next/script'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const patchPerformanceMeasure = `
  if (typeof window !== 'undefined' && window.performance && window.performance.measure) {
    const _origMeasure = window.performance.measure.bind(window.performance);
    window.performance.measure = function(name, startMark, endMark) {
      try {
        return _origMeasure(name, startMark, endMark);
      } catch (e) {
        // Ignore negative timestamp measurement errors in Next.js dev overlay
      }
    };
  }
`

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
