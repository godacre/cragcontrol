'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone }),
    });
    alert('Customer added!');
    router.push('/dashboard/checkin');
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-4xl mb-8">Add New Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl"
          required
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl"
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl"
        />
        <button type="submit" className="w-full bg-green-500 py-6 rounded-3xl text-2xl">
          Save Customer to Database
        </button>
      </form>
    </div>
  );
}
