import type { CollectionConfig } from 'payload'

export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'donorName',
  },
  access: {
    read: () => true,
    create: () => true, // frontend la donation submit panna anyone allow pannanum
  },
  fields: [
    {
      name: 'donationType',
      type: 'select',
      required: true,
      options: [
        { label: 'One-Time', value: 'one-time' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Special Project', value: 'special-project' },
      ],
    },
    {
      name: 'specialProject',
      type: 'select',
      admin: {
        condition: (data) => data.donationType === 'special-project',
      },
      options: [
        { label: 'Ramanujar Series', value: 'ramanujar-series' },
        { label: 'Sri Caitanyar Series', value: 'sri-caitanyar-series' },
        { label: 'Documentary Projects', value: 'documentary-projects' },
      ],
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      // Rupees la, e.g. 350, 500, 1000, 2000
    },
    {
      name: 'donorName',
      type: 'text',
      required: true,
    },
    {
      name: 'donorEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'donorPhone',
      type: 'text',
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      // Payment Gateway integrate panna aprm, idha auto-update pannuvom
    },
    {
      name: 'transactionId',
      type: 'text',
      // Razorpay/payment gateway oda transaction id
    },
    {
      name: 'donationDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
  ],
}