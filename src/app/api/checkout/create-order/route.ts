import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    const body = await req.json()
    const { items, total, name, email, phone, address } = body

    if (!items?.length || !total) {
      return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 })
    }

    // 1. MUNNADI namba Orders collection la pending record create pannuvom
    //    (Razorpay fail aanalum, idhu already create aagirukum)
    const orderRecord = await payload.create({
      collection: 'orders',
      data: {
        items,
        total,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: address,
        status: 'pending',
      },
    })

    // 2. Appuram Razorpay order create pannuvom
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',
      receipt: `receipt_${orderRecord.id}`,
    })

    // 3. Razorpay order id ah namba record la update pannuvom
    await payload.update({
      collection: 'orders',
      id: orderRecord.id,
      data: { razorpayOrderId: razorpayOrder.id },
    })

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      orderRecordId: orderRecord.id,
    })
  } catch (err: any) {
    console.error('Create order error:', err)
    // Razorpay fail aanalum, namba local order already create aagi irukum (status: pending)
    return NextResponse.json(
      { error: 'Payment gateway error, order saved as pending' },
      { status: 500 },
    )
  }
}
