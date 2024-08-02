// src/app/api/getPayment/route.ts
import { fetchPayment } from '@/components/payments/fetchPayment';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const paymentData = await fetchPayment({ user: userId });
    if (paymentData.data?.status === 200){
      return NextResponse.json({data: paymentData, status: 200});
    } else {
      return NextResponse.json({message: "No Payment Data", status: 404, plan: paymentData.plan});
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payment data' }, { status: 500 });
  }
}
