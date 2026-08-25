import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderRecordId } = body

    // 1. Signature verify pannuvom - idhu than security check, payment real ah nu confirm pannum
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // 2. Order record ah "paid" ah update pannuvom
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    if (orderRecordId) {
      await payload.update({
        collection: 'orders',
        id: orderRecordId,
        data: {
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Verify payment error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
