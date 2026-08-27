import type { CollectionConfig } from 'payload'

export const Songs: CollectionConfig = {
  slug: 'songs',
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
      // Example: "Hare Krishna Mahamantra"
    },
    {
      name: 'artist',
      type: 'text',
      // Example: "BVM Kirtan Group"
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      // Card background image
    },
    {
      name: 'audioType',
      type: 'select',
      required: true,
      options: [
        { label: 'YouTube Link', value: 'youtube' },
        { label: 'Uploaded Audio File', value: 'upload' },
      ],
      defaultValue: 'youtube',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      admin: {
        condition: (data) => data.audioType === 'youtube',
      },
    },
    {
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.audioType === 'upload',
      },
      // mp3 file direct upload
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
      // Example: "4:32"
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      // Homepage "Featured Songs" la kaattanuma nu control pannum
    },
  ],
}
