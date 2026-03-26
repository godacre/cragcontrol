'use client';
import { useState } from 'react';

export default function CheckIn() {
  const [barcode, setBarcode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'blocked'>('idle');
  const [reason, setReason] = useState('');

  const mockCustomers = {
    '12345': { name: 'Alex Rivera', status: 'success', message: '✅ GOOD TO GO' },
    '67890': { name: 'Jordan Kim', status: 'blocked', message: '❌ STOP - Missing Waiver' },
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = mockCustomers[barcode as keyof typeof mockCustomers];
    
    if (customer) {
      setStatus(customer.status as 'success' | 'blocked');
      setReason(customer.message);
      if (customer.status === 'success') {
        new Audio('https://www.soundjay.com/buttons/beep-07.mp3').play(); // success beep
      } else {
        new Audio('https://www.soundjay.com/buttons/beep-08b.mp3').play(); // warning sound
      }
    } else {
      setStatus('blocked');
      setReason('❌ STOP - Member not found');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
          🧗 Front Desk Check-In
        </h1>
        
        <form onSubmit={handleScan} className="mb-12">
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Scan barcode or type member ID (try 12345 or 67890)"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-8 py-6 text-2xl focus:outline-none focus:border-green-500"
            autoFocus
          />
          <button
            type="submit"
            className="mt-4 w-full bg-white text-black py-6 rounded-2xl text-2xl font-medium hover:bg-green-400"
          >
            Check In
          </button>
        </form>

        {status !== 'idle' && (
          <div className={`p-12 rounded-3xl text-center text-5xl font-bold transition-all ${
            status === 'success' 
              ? 'bg-green-500 text-white animate-pulse' 
              : 'bg-red-600 text-white'
          }`}>
            {reason}
            {status === 'success' && <p className="text-2xl mt-4">Alex Rivera • Welcome back!</p>}
          </div>
        )}
      </div>
    </div>
  );
}
