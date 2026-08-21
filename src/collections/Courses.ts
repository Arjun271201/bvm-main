import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // course details public ah theriyum, aana lesson content frontend la protect pannuvom
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      // Example: "Bhagavad-gita – Verse by Verse"
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'isPaid',
      type: 'checkbox',
      defaultValue: false,
      // Free course ah, paid course ah nu decide pannum
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        condition: (data) => data.isPaid === true,
      },
      // Rupees la, paid course ku mattum
    },
    {
      name: 'lessons',
      type: 'array',
      labels: { singular: 'Lesson', plural: 'Lessons' },
      fields: [
        {
          name: 'lessonTitle',
          type: 'text',
          required: true,
          // Example: "Chapter 1 - Introduction"
        },
        {
          name: 'videoType',
          type: 'select',
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
            condition: (data, siblingData) => siblingData.videoType === 'youtube',
          },
        },
        {
          name: 'videoFile',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData.videoType === 'upload',
          },
        },
        {
          name: 'duration',
          type: 'text',
          // Example: "18:20"
        },
        {
          name: 'isPreview',
          type: 'checkbox',
          defaultValue: false,
          // true na, login/purchase illama kooda paakalam (free preview lesson)
        },
      ],
      // "24 Lessons" nu count design la kaattura badge -> lessons.length use pannuvom frontend la
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}