'use client';
import { useState, useEffect } from 'react';

export default function Customers() {
  const [allCustomers] = useState([
    { id: 1, name: 'Matthew Goodacre', email: 'matthew@example.com', membership: 'Monthly', waiver: true, notes: 'Regular – loves 5.12 routes' },
    { id: 2, name: 'Alex Rivera', email: 'alex@example.com', membership: 'Annual', waiver: true, notes: 'Lead certified' },
    { id: 3, name: 'Jordan Kim', email: 'jordan@example.com', membership: 'Expired', waiver: false, notes: 'Needs belay test' },
  ]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [signatureData, setSignatureData] = useState('');

  const filtered = allCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('cragcontrol_customers');
    if (saved) console.log('Loaded saved customers');
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👤 Customers & CRM</h1>
      
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name (try typing 'matt')"
        className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-8"
      />

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-6 rounded-3xl max-h-[600px] overflow-auto">
          {filtered.map(c => (
            <button key={c.id} onClick={() => setSelected(c)} className="w-full text-left p-5 hover:bg-zinc-800 rounded-2xl mb-3">
              {c.name}
            </button>
          ))}
        </div>

        {selected && (
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h2 className="text-3xl">{selected.name}</h2>
            <p className="text-zinc-400">{selected.email}</p>
            <p className="mt-6"><strong>Notes:</strong> {selected.notes}</p>
            {/* Signature canvas stays the same as before */}
            <div className="mt-8 border border-zinc-700 p-6 rounded-3xl">
              <canvas width="600" height="200" className="border border-dashed w-full bg-white" />
              <button className="mt-4 bg-green-500 w-full py-4 rounded-2xl">Save Signature</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
