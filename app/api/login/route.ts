import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password, fullName } = await request.json();

  // First-time admin creation
  if (fullName) {
    const existing = await prisma.employee.count();
    if (existing > 0) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const employee = await prisma.employee.create({
      data: {
        username,
        passwordHash,
        fullName,
        isAdmin: true,
        employeeNumber: 1,
      },
    });

    return NextResponse.json({ employeeId: employee.id, isAdmin: true });
  }

  // Normal login
  const employee = await prisma.employee.findUnique({ where: { username } });
  if (!employee || !(await bcrypt.compare(password, employee.passwordHash))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ employeeId: employee.id, isAdmin: employee.isAdmin });
}
