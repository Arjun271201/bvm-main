import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'razorpayOrderId',
    defaultColumns: ['customerName', 'total', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true, // frontend la order create pannanum, login illama kooda
  },
  fields: [
    {
      name: 'items',
      type: 'json',
      // Cart items array (id, title, price, qty) idhula JSON ah store pannuvom
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
    },
    {
      name: 'shippingAddress',
      type: 'textarea',
    },
    {
      name: 'razorpayOrderId',
      type: 'text',
    },
    {
      name: 'razorpayPaymentId',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ],
}
