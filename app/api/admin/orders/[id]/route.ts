import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { status } = body;

  const order = await prisma.order.update({
    where: { id: params.id },
    data: { status },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(order);
}