'use client';
import { useState, useEffect } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Matthew Goodacre', email: 'matthew@example.com', phone: '416-555-1234', membership: 'Monthly', waiver: true, notes: 'Loves 5.12 routes', emergency: 'Sarah - 416-555-5678' },
    { id: 2, name: 'Alex Rivera', email: 'alex@example.com', phone: '416-555-9876', membership: 'Annual', waiver: true, notes: 'Lead certified', emergency: 'None' },
  ]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [isAdmin] = useState(() => localStorage.getItem('cragcontrol_role') === 'admin');

  const settings = JSON.parse(localStorage.getItem('cragcontrol_settings') || '{}');

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const addCustomer = () => {
    const newCustomer = { id: Date.now(), name: 'New Customer', email: '', phone: '', membership: 'Day Pass', waiver: false, notes: '', emergency: '' };
    setCustomers([...customers, newCustomer]);
    setSelected(newCustomer);
  };

  const deleteCustomer = (id: number) => {
    if (confirm('Delete this customer permanently?')) {
      setCustomers(customers.filter(c => c.id !== id));
      setSelected(null);
    }
  };

  const saveCustomer = () => {
    if (selected) {
      setCustomers(customers.map(c => c.id === selected.id ? selected : c));
      setSelected(null);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👤 Customers &amp; CRM {isAdmin && '(Admin Mode)'}</h1>
      
      <div className="flex gap-4 mb-8">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers (type matt...)" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl" />
        {isAdmin && <button onClick={addCustomer} className="bg-green-500 px-10 py-6 rounded-3xl text-xl">+ Add Customer</button>}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-6 rounded-3xl max-h-[600px] overflow-auto">
          {filtered.map(c => (
            <button key={c.id} onClick={() => setSelected(c)} className="w-full text-left p-5 hover:bg-zinc-800 rounded-2xl mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {c.membership === 'Monthly' ? '🔑' : c.membership === 'Annual' ? '🏆' : '🎟️'}
                </span>
                <div>
                  <div className="font-medium">{c.name}</div>
                  {settings.showPhoneInSearch && <div className="text-sm text-zinc-400">{c.phone}</div>}
                </div>
              </div>
              <div className={`px-4 py-1 rounded-full text-sm ${c.waiver ? 'bg-green-500' : 'bg-red-500'}`}>Waiver</div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <input value={selected.name} onChange={e => setSelected({...selected, name: e.target.value})} className="text-3xl font-bold bg-transparent border-b w-full mb-6" />
            {settings.showEmailInSearch && <input value={selected.email} onChange={e => setSelected({...selected, email: e.target.value})} className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-4" />}
            {settings.showPhoneInSearch && <input value={selected.phone} onChange={e => setSelected({...selected, phone: e.target.value})} className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-4" />}
            
            <select value={selected.membership} onChange={e => setSelected({...selected, membership: e.target.value})} className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-6">
              {JSON.parse(localStorage.getItem('cragcontrol_settings') || '{}').defaultMembershipTiers?.map((t: any) => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>

            <textarea value={selected.notes} onChange={e => setSelected({...selected, notes: e.target.value})} placeholder="Staff notes..." className="w-full h-32 bg-zinc-800 p-6 rounded-3xl" />

            {isAdmin && <button onClick={() => deleteCustomer(selected.id)} className="text-red-400 mt-8">🗑️ Delete Customer</button>}
            <button onClick={saveCustomer} className="mt-6 w-full bg-green-500 py-6 rounded-3xl text-xl">Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}
