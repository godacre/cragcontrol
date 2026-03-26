import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const count = await prisma.employee.count();
  return NextResponse.json({ count });
}
