'use client';
import { useState, useEffect } from 'react';

export default function CheckIn() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<any>(null);

  // Load real customers from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cragcontrol_customers');
      setCustomers(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setCustomers([]);
    }
  }, []);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const checkInMember = (customer: any) => {
    const isGood = customer.waiver === true && 
                  (customer.membership === 'Monthly' || customer.membership === 'Annual');

    setResult({
      ...customer,
      status: isGood ? 'success' : 'blocked',
      message: isGood ? '✅ GOOD TO GO' : '❌ STOP - Missing Waiver or Expired Membership'
    });

    // Play sound
    if (isGood) {
      new Audio('https://www.soundjay.com/buttons/beep-07.mp3').play();
    } else {
      new Audio('https://www.soundjay.com/buttons/beep-08b.mp3').play();
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🧗 Front Desk Check-In</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search member by name or type barcode..."
        className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-8 focus:border-green-500 outline-none"
        autoFocus
      />

      <div className="grid grid-cols-2 gap-8">
        {/* Search Results */}
        <div className="bg-zinc-900 p-6 rounded-3xl max-h-[600px] overflow-auto">
          <h2 className="text-xl mb-4">Matching Members</h2>
          {filteredCustomers.length === 0 && search && (
            <p className="text-zinc-400 py-8 text-center">No members found</p>
          )}
          {filteredCustomers.map(c => (
            <button
              key={c.id}
              onClick={() => checkInMember(c)}
              className="w-full text-left p-5 hover:bg-zinc-800 rounded-2xl mb-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {c.membership === 'Monthly' ? '🔑' : c.membership === 'Annual' ? '🏆' : '🎟️'}
                </span>
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-zinc-400">{c.email}</div>
                </div>
              </div>
              <div className={`px-4 py-1 rounded-full text-sm ${c.waiver ? 'bg-green-500' : 'bg-red-500'}`}>
                {c.waiver ? 'Waiver OK' : 'No Waiver'}
              </div>
            </button>
          ))}
        </div>

        {/* Check-In Result */}
        {result && (
          <div className={`p-12 rounded-3xl text-center text-5xl font-bold transition-all ${
            result.status === 'success' ? 'bg-green-500' : 'bg-red-600'
          }`}>
            {result.message}
            <p className="text-3xl mt-8">{result.name}</p>
            <p className="text-2xl mt-3">Membership: {result.membership}</p>
          </div>
        )}
      </div>
    </div>
  );
}
