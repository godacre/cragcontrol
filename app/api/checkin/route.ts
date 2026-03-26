import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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
