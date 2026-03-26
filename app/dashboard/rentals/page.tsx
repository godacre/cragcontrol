'use client';
import { useState, useEffect } from 'react';

export default function Rentals() {
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cragcontrol_inventory') || '[]');
    setInventory(saved);
  }, []);

  const saveInventory = (newInventory: any[]) => {
    setInventory(newInventory);
    localStorage.setItem('cragcontrol_inventory', JSON.stringify(newInventory));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'New Item',
      price: 19.99,
      stock: 10
    };
    const updated = [...inventory, newItem];
    saveInventory(updated);
  };

  const updateItem = (id: number, field: string, value: any) => {
    const updated = inventory.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    saveInventory(updated);
  };

  const deleteItem = (id: number) => {
    if (confirm('Delete this item?')) {
      const updated = inventory.filter(item => item.id !== id);
      saveInventory(updated);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📦 Rentals &amp; Inventory</h1>
      
      <button onClick={addItem} className="mb-8 bg-green-500 px-8 py-4 rounded-3xl text-xl">
        + Add New Item
      </button>

      <div className="bg-zinc-900 p-8 rounded-3xl">
        {inventory.map(item => (
          <div key={item.id} className="grid grid-cols-5 gap-4 mb-6 items-center border-b border-zinc-700 pb-6">
            <input 
              value={item.name} 
              onChange={e => updateItem(item.id, 'name', e.target.value)} 
              className="bg-zinc-800 px-4 py-3 rounded-2xl"
            />
            <input 
              type="number" 
              value={item.price} 
              onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value))} 
              className="bg-zinc-800 px-4 py-3 rounded-2xl"
            />
            <input 
              type="number" 
              value={item.stock} 
              onChange={e => updateItem(item.id, 'stock', parseInt(e.target.value))} 
              className="bg-zinc-800 px-4 py-3 rounded-2xl"
            />
            <button onClick={() => deleteItem(item.id)} className="text-red-400">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
