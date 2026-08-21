import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // public ah read pannalam (frontend ku)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      // Example: "Videos", "Songs", "Books", "Store", "Downloads", "Interactive"
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      // Example: "videos", "songs", "books" — URL ku use pannuvom
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      // Explore BVM tile la kaattura background image
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Play', value: 'play' },
        { label: 'Music', value: 'music' },
        { label: 'Book', value: 'book' },
        { label: 'Cart', value: 'cart' },
        { label: 'Download', value: 'download' },
        { label: 'Heart', value: 'heart' },
      ],
      // Design la tile mela irukura small icon
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      // Tiles ah correct order la kaatta (0,1,2,3...)
    },
  ],
}