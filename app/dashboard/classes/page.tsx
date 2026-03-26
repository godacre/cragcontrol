'use client';
import { useState, useEffect } from 'react';

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/classes').then(res => res.json()).then(setClasses);
    fetch('/api/customers').then(res => res.json()).then(setCustomers);
  }, []);

  const handleClassCheckIn = async (classId: string, customerId: string) => {
    await fetch('/api/class-checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classId, customerId }),
    });
    alert('Checked in to class!');
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8">Classes – Check In / Out</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Class list */}
        <div>
          <h2 className="text-2xl mb-4">Today’s Classes</h2>
          {classes.map(cls => (
            <div
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`p-6 rounded-3xl cursor-pointer mb-4 ${selectedClass === cls.id ? 'bg-green-500 text-black' : 'bg-zinc-900'}`}
            >
              <p className="text-xl">{cls.name}</p>
              <p className="text-sm opacity-75">{new Date(cls.startTime).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>

        {/* Check-in panel */}
        {selectedClass && (
          <div>
            <h2 className="text-2xl mb-4">Check people into class</h2>
            {customers.map(customer => (
              <div key={customer.id} className="flex justify-between bg-zinc-900 p-6 rounded-3xl mb-4 items-center">
                <span className="text-xl">{customer.fullName}</span>
                <button
                  onClick={() => handleClassCheckIn(selectedClass, customer.id)}
                  className="bg-green-500 px-8 py-4 rounded-3xl"
                >
                  Check In
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
