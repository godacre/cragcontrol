import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const customers = await prisma.customer.findMany();
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  const data = await request.json();
  const customer = await prisma.customer.create({ data });
  return NextResponse.json(customer);
}
