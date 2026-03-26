'use client';
import { useState } from 'react';

export default function CheckIn() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult({ name: 'Matthew Goodacre', status: 'success' });
    new Audio('https://www.soundjay.com/buttons/beep-07.mp3').play();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🧗 Front Desk Check-In</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scan barcode or type name"
          className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl"
        />
        <button type="submit" className="mt-4 w-full bg-green-500 py-6 rounded-3xl text-2xl">Check In</button>
      </form>
      {result && (
        <div className="mt-12 p-12 rounded-3xl text-center text-5xl bg-green-500">
          ✅ GOOD TO GO
          <p className="text-3xl mt-6">{result.name}</p>
        </div>
      )}
    </div>
  );
}
