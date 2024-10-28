import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation, sendOrderNotificationToAdmin } from '@/lib/email';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { items, total, address } = body;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        address,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Send confirmation emails
    await Promise.all([
      sendOrderConfirmation(order),
      sendOrderNotificationToAdmin(order),
    ]);

    return NextResponse.json(order);
  } catch (error) {
    console.error('Checkout error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}