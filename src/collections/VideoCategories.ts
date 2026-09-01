import type { CollectionConfig } from 'payload'

export const VideoCategories: CollectionConfig = {
  slug: 'video-categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Category Name',
    },
  ],
}
