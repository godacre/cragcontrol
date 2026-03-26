'use client';
import { useState } from 'react';

export default function Rentals() {
  const [rentals, setRentals] = useState([
    { id: 1, name: 'La Sportiva Mythos', price: 129, stock: 12 },
  ]);
  const [newRentalName, setNewRentalName] = useState('');
  const [newRentalPrice, setNewRentalPrice] = useState(0);

  const addRentalItem = () => {
    if (newRentalName && newRentalPrice > 0) {
      setRentals([...rentals, { id: Date.now(), name: newRentalName, price: newRentalPrice, stock: 10 }]);
      setNewRentalName('');
      setNewRentalPrice(0);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📦 Rentals & Inventory</h1>
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">Rental Items</h2>
        {rentals.map(r => (
          <div key={r.id} className="flex justify-between py-6 border-b border-zinc-700">
            <span>{r.name}</span>
            <span>${r.price} (stock: {r.stock})</span>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 p-8 rounded-3xl mt-8">
        <h2 className="text-2xl mb-6">Add New Rental Item</h2>
        <input value={newRentalName} onChange={e => setNewRentalName(e.target.value)} placeholder="Item name" className="bg-zinc-800 px-6 py-4 rounded-3xl w-full mb-4" />
        <input type="number" value={newRentalPrice} onChange={e => setNewRentalPrice(parseFloat(e.target.value))} placeholder="Daily rental price" className="bg-zinc-800 px-6 py-4 rounded-3xl w-full mb-4" />
        <button onClick={addRentalItem} className="w-full bg-green-500 py-6 rounded-3xl">Add Rental Item</button>
      </div>
    </div>
  );
}
