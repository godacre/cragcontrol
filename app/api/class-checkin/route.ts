import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { classId, customerId } = await request.json();
  const checkIn = await prisma.classCheckIn.create({
    data: { classId, customerId },
  });
  return NextResponse.json(checkIn);
}
