'use client';
import { useState, useEffect } from 'react';

export default function Inventory() {
  const [items, setItems] = useState([
    { id: 1, name: 'Mammut Chalk 300g', price: 8.99, stock: 42, barcode: 'CHALK001' },
    { id: 2, name: 'La Sportiva Mythos', price: 129, stock: 8, barcode: 'SHOE003' },
  ]);

  const addItem = () => {
    const newItem = { id: Date.now(), name: 'New Item', price: 19.99, stock: 10, barcode: '' };
    setItems([...items, newItem]);
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(i => i.id === id ? {...i, [field]: value} : i));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📦 Inventory Management (Editable)</h1>
      <button onClick={addItem} className="mb-6 bg-green-500 px-8 py-4 rounded-3xl">+ Add New Inventory Item</button>
      
      <div className="bg-zinc-900 p-8 rounded-3xl">
        {items.map(item => (
          <div key={item.id} className="grid grid-cols-5 gap-4 mb-6 items-center border-b border-zinc-700 pb-6">
            <input value={item.name} onChange={e => updateItem(item.id, 'name', e.target.value)} className="bg-zinc-800 px-4 py-3 rounded-2xl" />
            <input type="number" value={item.price} onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value))} className="bg-zinc-800 px-4 py-3 rounded-2xl" />
            <input type="number" value={item.stock} onChange={e => updateItem(item.id, 'stock', parseInt(e.target.value))} className="bg-zinc-800 px-4 py-3 rounded-2xl" />
            <input value={item.barcode} onChange={e => updateItem(item.id, 'barcode', e.target.value)} className="bg-zinc-800 px-4 py-3 rounded-2xl" />
            <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="text-red-400">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
