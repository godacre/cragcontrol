'use client';
import { useState } from 'react';

export default function Rentals() {
  const [items, setItems] = useState([
    { id: 1, name: 'Mammut Chalk 300g', price: 8.99, stock: 42, barcode: 'CHALK001' },
  ]);

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(i => i.id === id ? {...i, [field]: value} : i));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📦 Rentals & Inventory</h1>
      <button className="mb-6 bg-green-500 px-8 py-4 rounded-3xl">+ Add New Item</button>
      <div className="bg-zinc-900 p-8 rounded-3xl">
        {items.map(item => (
          <div key={item.id} className="grid grid-cols-5 gap-4 mb-6 items-center">
            <input value={item.name} onChange={e => updateItem(item.id, 'name', e.target.value)} className="bg-zinc-800 px-4 py-3 rounded-2xl" />
            <input type="number" value={item.price} onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value))} className="bg-zinc-800 px-4 py-3 rounded-2xl" />
            <input type="number" value={item.stock} onChange={e => updateItem(item.id, 'stock', parseInt(e.target.value))} className="bg-zinc-800 px-4 py-3 rounded-2xl" />
            <button className="text-red-400">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
