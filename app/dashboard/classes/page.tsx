'use client';

import { useState, useEffect } from 'react';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type ClassWithDetails = {
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

async function getClasses(): Promise<ClassWithDetails[]> {
  'use server';
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

async function createClass(formData: FormData) {
  'use server';
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

async function deleteClass(id: string) {
  'use server';
  await prisma.class.delete({ where: { id } });
  revalidatePath('/dashboard/classes');
}

async function checkInToClass(classId: string, customerId: string) {
  'use server';
  await prisma.classCheckIn.create({
    data: { classId, customerId },
  });
  revalidatePath('/dashboard/classes');
}

async function checkOutFromClass(checkInId: string) {
  'use server';
  await prisma.classCheckIn.delete({ where: { id: checkInId } });
  revalidatePath('/dashboard/classes');
}

export default function Classes() {
  const [classes, setClasses] = useState<ClassWithDetails[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('cragcontrol_role');
    setIsAdmin(role === 'superadmin' || role === 'admin');

    async function loadData() {
      const data = await getClasses();
      setClasses(data);
    }
    loadData();
  }, []);

  const handleCreate = async (formData: FormData) => {
    await createClass(formData);
    setShowCreateModal(false);
    const data = await getClasses();
    setClasses(data);
  };

  const handleCheckIn = async (customerId: string) => {
    if (!selectedClassId) return;
    await checkInToClass(selectedClassId, customerId);
    setShowCheckInModal(false);
    setSelectedClassId(null);
    const data = await getClasses();
    setClasses(data);
  };

  const handleCheckOut = async (checkInId: string) => {
    if (confirm('Check out this customer?')) {
      await checkOutFromClass(checkInId);
      const data = await getClasses();
      setClasses(data);
    }
  };

  const searchCustomers = async () => {
    const data = await prisma.customer.findMany({
      where: {
        OR: [
          { fullName: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
    setCustomers(data);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Classes</h1>
        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-3xl text-xl font-medium transition"
          >
            + Create New Class
          </button>
        )}
      </div>

      <div className="space-y-8">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-zinc-900 p-8 rounded-3xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-3xl font-bold">{cls.name}</div>
                <div className="text-zinc-400 mt-2 text-lg">
                  {cls.startTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} •{' '}
                  {cls.startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} –{' '}
                  {cls.endTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </div>
                {cls.description && <p className="text-zinc-400 mt-3">{cls.description}</p>}
                <div className="mt-4 text-sm text-zinc-500">
                  Instructor: {cls.instructor?.fullName || 'TBD'} •{' '}
                  Checked in: {cls._count.checkIns}/{cls.capacity}
                </div>
              </div>

              <div className="text-right flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSelectedClassId(cls.id);
                    setShowCheckInModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-3xl text-white font-medium"
                >
                  Check In
                </button>
                {isAdmin && (
                  <button
                    onClick={async () => {
                      if (confirm('Delete this class and all its check-ins?')) {
                        await deleteClass(cls.id);
                        const data = await getClasses();
                        setClasses(data);
                      }
                    }}
                    className="text-red-400 text-sm hover:underline"
                  >
                    Delete Class
                  </button>
                )}
              </div>
            </div>

            {/* Checked-in customers + Check Out */}
            {cls.checkIns.length > 0 && (
              <div className="mt-8">
                <div className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Currently Checked In</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cls.checkIns.map((checkIn) => (
                    <div
                      key={checkIn.id}
                      className="bg-zinc-800 p-4 rounded-2xl flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{checkIn.customer.fullName}</div>
                        {checkIn.customer.email && (
                          <div className="text-xs text-zinc-400">{checkIn.customer.email}</div>
                        )}
                      </div>
                      <button
                        onClick={() => handleCheckOut(checkIn.id)}
                        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-3xl text-sm font-medium"
                      >
                        Check Out
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CREATE MODAL (admins only) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Create Class</h2>
            <form action={handleCreate} className="space-y-4">
              <input name="name" placeholder="Class name (e.g. Intro to Lead Climbing)" className="w-full bg-zinc-800 px-4 py-3 rounded-2xl" required />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Start</label>
                  <input name="startTime" type="datetime-local" className="w-full bg-zinc-800 px-4 py-3 rounded-2xl" required />
                </div>
                <div>
                  <label className="block text-sm mb-1">End</label>
                  <input name="endTime" type="datetime-local" className="w-full bg-zinc-800 px-4 py-3 rounded-2xl" required />
                </div>
              </div>
              <select name="instructorId" className="w-full bg-zinc-800 px-4 py-3 rounded-2xl">
                <option value="">No instructor / TBD</option>
              </select>
              <input name="capacity" type="number" defaultValue={12} className="w-full bg-zinc-800 px-4 py-3 rounded-2xl" />
              <textarea name="description" placeholder="Description / notes" className="w-full bg-zinc-800 px-4 py-3 rounded-2xl h-24" />
              
              <div className="flex items-center gap-2">
                <input type="checkbox" name="repeatWeekly" id="repeat" className="w-5 h-5" />
                <label htmlFor="repeat" className="font-medium">Repeat weekly</label>
              </div>
              <input name="repeatWeeks" type="number" defaultValue={4} min="1" className="w-full bg-zinc-800 px-4 py-3 rounded-2xl" />

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-green-500 py-4 rounded-3xl text-lg font-medium">Create</button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-zinc-700 py-4 rounded-3xl text-lg font-medium">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHECK-IN MODAL (all staff) */}
      {showCheckInModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Check-in to Class</h2>
            <div className="flex gap-2 mb-4">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search customer name or email"
                className="flex-1 bg-zinc-800 px-4 py-3 rounded-2xl"
              />
              <button onClick={searchCustomers} className="bg-blue-600 px-6 rounded-2xl">Search</button>
            </div>

            <div className="max-h-80 overflow-auto space-y-2">
              {customers.map((cust) => (
                <div
                  key={cust.id}
                  onClick={() => handleCheckIn(cust.id)}
                  className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl cursor-pointer flex justify-between"
                >
                  <div>
                    <div className="font-medium">{cust.fullName}</div>
                    {cust.email && <div className="text-xs text-zinc-400">{cust.email}</div>}
                  </div>
                  <span className="text-green-400 text-sm self-center">✓ Check in</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setShowCheckInModal(false);
                setSelectedClassId(null);
              }}
              className="w-full mt-6 bg-zinc-700 py-4 rounded-3xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
