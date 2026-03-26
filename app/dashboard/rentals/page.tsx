'use client';
import { useState } from 'react';

export default function Rentals() {
  const [rentals] = useState([
    { id: 1, item: 'La Sportiva Mythos', customer: 'Alex Rivera', due: 'Tomorrow' },
    { id: 2, item: 'Petzl harness', customer: 'Jordan Kim', due: 'Overdue' },
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📦 Rentals & Inventory</h1>
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">Current Rentals</h2>
        {rentals.map(r => (
          <div key={r.id} className="flex justify-between border-b border-zinc-700 py-5">
            <div>{r.item} → {r.customer}</div>
            <div className={r.due === 'Overdue' ? 'text-red-500' : 'text-yellow-400'}>{r.due}</div>
          </div>
        ))}
      </div>
      <button className="mt-8 bg-white text-black px-10 py-5 rounded-3xl text-xl">+ New Rental (scan barcode)</button>
    </div>
  );
}
