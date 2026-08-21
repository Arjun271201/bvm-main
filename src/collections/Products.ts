import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
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
      // Example: "Shrimad Bhagavad Gita"
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      labels: { singular: 'Image', plural: 'Images' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
      // Multiple product photos (gallery)
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      // Rupees la, e.g. 350
    },
    {
      name: 'comparePrice',
      type: 'number',
      // Optional — discount kaatta original price (strikethrough)
    },
    {
      name: 'stock',
      type: 'number',
      defaultValue: 0,
      // Inventory count — cart la "out of stock" check panna use pannuvom
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'productType',
      type: 'select',
      options: [
        { label: 'Book', value: 'book' },
        { label: 'Japa Mala / Accessory', value: 'accessory' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'book',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      // Homepage "Featured Books" la kaattanuma nu control pannum
    },
  ],
}