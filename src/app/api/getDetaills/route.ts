import { fetchPayment } from '@/components/payments/fetchPayment';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const paymentData = await fetchPayment({ user: userId });
    res.status(200).json(paymentData);
  } catch (error) {
    console.error('Error fetching payment data:', error);
    res.status(500).json({ error: 'Failed to fetch payment data' });
  }
}