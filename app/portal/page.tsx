'use client';
import { useState } from 'react';

export default function MemberPortal() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSelfCheckIn = () => {
    setResult({
      name: 'Matthew Goodacre',
      message: '✅ Self Check-In Successful',
      nextClass: 'Lead Climbing @ 7:30 PM'
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center">🏔️ CragControl Member Portal</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scan QR or type member ID"
          className="w-full bg-white text-black rounded-3xl px-8 py-8 text-3xl mb-8"
        />
        <button onClick={handleSelfCheckIn} className="w-full bg-green-500 py-8 rounded-3xl text-3xl font-medium">Self Check-In</button>
        
        {result && (
          <div className="mt-12 bg-green-500 text-black p-12 rounded-3xl text-center text-4xl font-bold">
            {result.message}
            <p className="text-2xl mt-6">{result.name}</p>
            <p className="text-xl mt-4">Next: {result.nextClass}</p>
          </div>
        )}
      </div>
    </div>
  );
}
