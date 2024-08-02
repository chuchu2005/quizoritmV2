// src/app/api/getPayment/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { method } = await request.json();

  try {
    if (method === 'flutterwave'){
        return NextResponse.json({publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY, secretKey: process.env.FLUTTERWAVE_SECRET_KEY,encKey: process.env.FLUTTERWAVE_ENC_KEY, status: 200});
    }else{
        return NextResponse.json({secretKey: process.env.PAYSTACK_SECRET_KEY, status: 200});
    }
  } catch (error) {
    return NextResponse.json({ error: 'No keys' }, { status: 500 });
  }
}
