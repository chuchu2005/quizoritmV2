import { prisma } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    // Fetch the user and their games
    const user = await prisma.user.findUnique({
      where: { userId },
      include: {
        games: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the plan is 'hobby' and count the games
    if (user.plan === 'hobby') {
      const numberOfGames = user.games.length;
      const isUnderLimit = numberOfGames < 3;

      return res.status(200).json({ isUnderLimit });
    } else {
      return res.status(200).json({ message: 'User does not have a hobby plan' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
