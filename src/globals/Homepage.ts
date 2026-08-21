import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      labels: { singular: 'Hero Slide', plural: 'Hero Slides' },
      minRows: 1,
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'WELCOME TO BHAKTI VEDANTA MEDIA',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          // Example: "Discover Timeless Wisdom Through Devotional Media"
        },
        {
          name: 'subtext',
          type: 'textarea',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Watch Now',
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/videos',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          // Idhu than Hero section background image - temple/devotee photo
        },
      ],
    },
  ],
}
