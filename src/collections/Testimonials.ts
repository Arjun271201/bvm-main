import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
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
      // Example: "Tharun S."
    },
    {
      name: 'location',
      type: 'text',
      // Example: "Bengaluru, India"
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      // Background photo of the person
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      // Example: "The videos and courses have helped me..."
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      // Stars kaatta
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}