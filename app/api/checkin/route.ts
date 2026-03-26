import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { customerId, employeeId } = await request.json();

  const checkIn = await prisma.checkIn.create({
    data: {
      customerId,
      employeeId,
      status: 'SUCCESS',
    },
  });

  return NextResponse.json(checkIn);
}
