// src/app/api/getDetails/route.ts
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
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
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the plan is 'hobby' and count the games
    if (user.plan === 'hobby') {
      const numberOfGames = user.games.length;
      const isUnderLimit = numberOfGames < 3;

      return NextResponse.json({ isUnderLimit });
    } else {
      return NextResponse.json({ message: 'User does not have a hobby plan' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
