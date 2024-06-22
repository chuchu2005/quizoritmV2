import { Webhook } from 'svix';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface ClerkEvent {
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    email_addresses: { email_address: string }[];
    image_url: string;
  };
  type: string;
}

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is not set in the environment variables');
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers');
    return NextResponse.json({ message: 'Error occurred -- no svix headers' }, { status: 400 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch (err) {
    console.error('Error parsing JSON payload:', err);
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
  }

  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: ClerkEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ message: 'Error occurred' }, { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook received with ID ${id} and type ${eventType}`);
  
  try {
    switch (eventType) {
      case 'user.created':
        await prisma.user.create({
          data: {
            userId: evt.data.id,
            firstName: evt.data.first_name ?? null,
            email: evt.data.email_addresses[0]?.email_address ?? null, // Ensure the email address exists
            lastName: evt.data.last_name ?? null,
            imageUrl: evt.data.image_url,
          },
        });
        return NextResponse.json({ message: 'User created', data: evt.data }, { status: 201 });

      case 'user.updated':
        const existingUser = await prisma.user.findUnique({
          where: { userId: evt.data.id },
        });

        if (!existingUser) {
          console.error(`User with ID ${evt.data.id} not found`);
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        await prisma.user.update({
          where: {
            userId: evt.data.id,
          },
          data: {
            firstName: evt.data.first_name ?? null,
            lastName: evt.data.last_name ?? null,
            email: evt.data.email_addresses[0]?.email_address ?? null, // Ensure the email address exists
            imageUrl: evt.data.image_url,
          },
        });
        return NextResponse.json({ message: 'User updated', data: evt.data }, { status: 200 });

      case 'session.created':
        await prisma.user.create({
          data: {
            userId: evt.data.id,
            firstName: evt.data.first_name ?? null,
            email: evt.data.email_addresses[0]?.email_address ?? null, // Ensure the email address exists
            lastName: evt.data.last_name ?? null,
            imageUrl: evt.data.image_url,
          },
        });
        return NextResponse.json({ message: 'User created', data: evt.data }, { status: 201 });
  
      case 'user.deleted':
        await prisma.user.delete({
          where: {
            userId: evt.data.id,
          },
        });
        return NextResponse.json({ message: 'User deleted', data: evt.data }, { status: 200 });

      default:
        console.warn(`Unsupported event type: ${eventType}`);
        return NextResponse.json({ message: 'Event type not supported' }, { status: 400 });
    }
  } catch (err) {
    console.error('Error handling event:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
