import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'sectionHeadings',
      type: 'group',
      label: 'Homepage Section Headings',
      admin: {
        description: 'Update the headings shown on the homepage sections.',
      },
      fields: [
        { name: 'explore', type: 'text', label: 'Explore BVM', defaultValue: 'Explore BVM' },
        {
          name: 'latestUploads',
          type: 'text',
          label: 'Latest Uploads',
          defaultValue: 'Latest Uploads',
        },
        {
          name: 'featuredSongs',
          type: 'text',
          label: 'Featured Songs',
          defaultValue: 'Featured Songs',
        },
        {
          name: 'featuredBooks',
          type: 'text',
          label: 'Featured Books',
          defaultValue: 'Featured Books',
        },
        { name: 'courses', type: 'text', label: 'Courses', defaultValue: 'Courses' },
        { name: 'supportBVM', type: 'text', label: 'Support BVM', defaultValue: 'Support BVM' },
        { name: 'testimonials', type: 'text', label: 'Testimonials', defaultValue: 'Testimonial' },
      ],
    },
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
    {
      name: 'videoFilters',
      type: 'group',
      label: 'Language Video Filters',
      admin: {
        description:
          'Edit the category and channel options that appear on the selected-language video page.',
      },
      fields: [
        {
          name: 'categoryOptions',
          type: 'array',
          label: 'Category Options',
          labels: { singular: 'Category', plural: 'Categories' },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'channelOptions',
          type: 'array',
          label: 'Channel Options',
          labels: { singular: 'Channel', plural: 'Channels' },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
