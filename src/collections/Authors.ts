import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
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
      label: 'Author Name',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'Optional slug for URLs or references.',
      },
    },
  ],
}
