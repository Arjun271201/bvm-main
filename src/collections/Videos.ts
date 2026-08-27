import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      // Example: "Bhagavad-gita Chapter 2"
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      // Example: "Discover Lord Krishna's timeless teachings..."
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      // Card la kaattura image
    },
    {
      name: 'videoType',
      type: 'select',
      required: true,
      options: [
        { label: 'YouTube Link', value: 'youtube' },
        { label: 'Uploaded File', value: 'upload' },
      ],
      defaultValue: 'youtube',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      admin: {
        condition: (data) => data.videoType === 'youtube',
      },
      // YouTube video link, embed panna use pannuvom
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.videoType === 'upload',
      },
      // Direct upload panna file
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'languageCategory',
      type: 'relationship',
      relationTo: 'languages',
      label: 'Language Category',
    },
    {
      name: 'duration',
      type: 'text',
      // Example: "12:45"
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      // Homepage "Latest Uploads" la kaattanuma nu control pannum
    },
    {
      name: 'publishedDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
