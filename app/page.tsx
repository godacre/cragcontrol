'use client';
import { useState } from 'react';

export default function CheckIn() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const mockMembers = {
    '12345': { name: 'Alex Rivera', waiver: true, membership: 'Monthly Active', belay: 'Lead Certified', message: '✅ GOOD TO GO' },
    '67890': { name: 'Jordan Kim', waiver: false, membership: 'Expired', belay: 'None', message: '❌ STOP - Missing Waiver & Expired Membership' },
    '11111': { name: 'Taylor Chen', waiver: true, membership: 'Day Pass', belay: 'Top Rope Only', message: '✅ GOOD TO GO' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const member = mockMembers[input as keyof typeof mockMembers];
    if (member) {
      setResult(member);
      // Play sound
      const audio = new Audio(member.waiver ? 'https://www.soundjay.com/buttons/beep-07.mp3' : 'https://www.soundjay.com/buttons/beep-08b.mp3');
      audio.play();
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🧗 Front Desk Check-In</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scan barcode / QR / RFID or type member ID"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl focus:border-green-500 outline-none"
          autoFocus
        />
        <button type="submit" className="mt-4 w-full bg-green-500 hover:bg-green-600 py-6 rounded-3xl text-2xl font-medium">
          Check In
        </button>
      </form>

      {result && (
        <div className={`mt-12 p-10 rounded-3xl text-center text-5xl font-bold ${result.waiver ? 'bg-green-500' : 'bg-red-600'}`}>
          {result.message}
          <p className="text-2xl mt-6">{result.name}</p>
          <p className="text-xl mt-2">Membership: {result.membership}</p>
          <p className="text-xl">Belay Cert: {result.belay}</p>
        </div>
      )}
    </div>
  );
}
