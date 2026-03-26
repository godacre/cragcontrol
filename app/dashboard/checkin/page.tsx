'use client';
import { useState, useEffect } from 'react';
import { prisma } from '../../../lib/prisma';

export default function CheckInPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [employeeId] = useState(localStorage.getItem('cragcontrol_employeeId'));

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(setCustomers);
  }, []);

  const filtered = customers.filter(c => 
    c.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckIn = async (customerId: string) => {
    await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, employeeId }),
    });
    alert('Guest checked in successfully!');
    // refresh list
    window.location.reload();
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8">Check-In Desk</h1>
      
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-8"
      />

      <div className="space-y-4">
        {filtered.map((customer) => (
          <div key={customer.id} className="bg-zinc-900 p-6 rounded-3xl flex justify-between items-center">
            <div>
              <p className="text-2xl">{customer.fullName}</p>
              <p className="text-zinc-400">{customer.email || customer.phone}</p>
            </div>
            <button
              onClick={() => handleCheckIn(customer.id)}
              className="bg-green-500 px-12 py-6 rounded-3xl text-xl"
            >
              Check In
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
