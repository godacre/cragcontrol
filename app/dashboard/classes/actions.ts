'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type ClassWithDetails = {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  instructor?: { fullName: string | null };
  capacity: number;
  description?: string | null;
  _count: { checkIns: number };
  checkIns: {
    id: string;
    customer: { fullName: string; email?: string | null };
  }[];
};

export async function getClasses(): Promise<ClassWithDetails[]> {
  return prisma.class.findMany({
    include: {
      instructor: { select: { fullName: true } },
      _count: { select: { checkIns: true } },
      checkIns: {
        include: { customer: { select: { fullName: true, email: true } } },
      },
    },
    orderBy: { startTime: 'asc' },
  });
}

export async function createClass(formData: FormData) {
  const name = formData.get('name') as string;
  const startTime = new Date(formData.get('startTime') as string);
  const endTime = new Date(formData.get('endTime') as string);
  const instructorId = formData.get('instructorId') as string | null;
  const capacity = parseInt(formData.get('capacity') as string) || 12;
  const description = formData.get('description') as string | null;
  const repeatWeekly = formData.get('repeatWeekly') === 'on';
  const repeatWeeks = parseInt(formData.get('repeatWeeks') as string) || 1;

  const classesToCreate = [];
  let currentStart = new Date(startTime);

  for (let i = 0; i < (repeatWeekly ? repeatWeeks : 1); i++) {
    classesToCreate.push({
      name,
      startTime: new Date(currentStart),
      endTime: new Date(currentStart.getTime() + (endTime.getTime() - startTime.getTime())),
      instructorId: instructorId || undefined,
      capacity,
      description,
    });
    currentStart.setDate(currentStart.getDate() + 7);
  }

  await prisma.class.createMany({ data: classesToCreate });
  revalidatePath('/dashboard/classes');
}

export async function deleteClass(id: string) {
  await prisma.class.delete({ where: { id } });
  revalidatePath('/dashboard/classes');
}

export async function checkInToClass(classId: string, customerId: string) {
  await prisma.classCheckIn.create({
    data: { classId, customerId },
  });
  revalidatePath('/dashboard/classes');
}

export async function checkOutFromClass(checkInId: string) {
  await prisma.classCheckIn.delete({ where: { id: checkInId } });
  revalidatePath('/dashboard/classes');
}

export async function searchCustomers(searchTerm: string) {
  return prisma.customer.findMany({
    where: {
      OR: [
        { fullName: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    take: 10,
  });
}
