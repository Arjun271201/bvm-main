import React from 'react'
import Script from 'next/script'
import './styles.css'
import { CartProvider } from '@/components/cart/CartContext'
import { BreadcrumbProvider } from '@/components/BreadcrumbContext'
import CartDrawer from '@/components/cart/CartDrawer'
import FrontendChrome from '@/components/FrontendChrome'
import { getSiteVersion } from '@/lib/siteVersion'
import LiveReloader from '@/components/LiveReloader'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'BVM - BHAKTI VEDANTA MEDIA',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const initialVersion = await getSiteVersion()

  const patchPerformanceMeasure = `
    if (typeof window !== 'undefined' && window.performance && window.performance.measure) {
      const _origMeasure = window.performance.measure.bind(window.performance);
      window.performance.measure = function(name, startMark, endMark) {
        try {
          return _origMeasure(name, startMark, endMark);
        } catch (e) {}
      };
    }
    if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
      const stripExtensionAttrs = function() {
        document.querySelectorAll('[fdprocessedid]').forEach(function(el) {
          el.removeAttribute('fdprocessedid');
        });
      };
      stripExtensionAttrs();
      var observer = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.type === 'attributes' && m.attributeName === 'fdprocessedid') {
            (m.target).removeAttribute('fdprocessedid');
          }
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        subtree: true,
        attributeFilter: ['fdprocessedid']
      });
    }
  `

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#2c0002]" suppressHydrationWarning>
        <Script id="patch-performance-measure" strategy="beforeInteractive">
          {patchPerformanceMeasure}
        </Script>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <CartProvider>
          <BreadcrumbProvider>
            <FrontendChrome>{children}</FrontendChrome>
            <CartDrawer />
            <LiveReloader initialVersion={initialVersion} />
          </BreadcrumbProvider>
        </CartProvider>
      </body>
    </html>
  )
}

