'use client';
import { useState, useEffect } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load customers from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cragcontrol_customers') || '[]');
    setCustomers(saved);
    const role = localStorage.getItem('cragcontrol_role');
    setIsAdmin(role === 'superadmin' || role === 'admin');
  }, []);

  const saveCustomers = (newCustomers: any[]) => {
    setCustomers(newCustomers);
    localStorage.setItem('cragcontrol_customers', JSON.stringify(newCustomers));
  };

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const addCustomer = () => {
    const newCustomer = {
      id: Date.now(),
      name: 'New Member',
      email: '',
      phone: '',
      dob: '',
      emergencyContact: '',
      notes: '',
      waiver: false,
      membership: 'Day Pass'
    };
    saveCustomers([...customers, newCustomer]);
    setSelected(newCustomer);
  };

  const deleteCustomer = (id: number) => {
    if (confirm('Delete this member permanently?')) {
      saveCustomers(customers.filter(c => c.id !== id));
      setSelected(null);
    }
  };

  const saveCustomer = () => {
    if (selected) {
      saveCustomers(customers.map(c => c.id === selected.id ? selected : c));
      setSelected(null);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👤 Customers &amp; CRM</h1>
      
      <div className="flex gap-4 mb-8">
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search members..." 
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl"
        />
        {isAdmin && <button onClick={addCustomer} className="bg-green-500 px-10 py-6 rounded-3xl text-xl">+ Add Member</button>}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* List */}
        <div className="bg-zinc-900 p-6 rounded-3xl max-h-[650px] overflow-auto">
          {filtered.map(c => (
            <button 
              key={c.id} 
              onClick={() => setSelected(c)} 
              className="w-full text-left p-5 hover:bg-zinc-800 rounded-2xl mb-3 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-zinc-400">{c.email}</div>
              </div>
              <div className={`px-4 py-1 rounded-full text-sm ${c.waiver ? 'bg-green-500' : 'bg-red-500'}`}>Waiver</div>
            </button>
          ))}
        </div>

        {/* Edit Form */}
        {selected && (
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <input 
              value={selected.name} 
              onChange={e => setSelected({...selected, name: e.target.value})} 
              className="text-3xl font-bold bg-transparent border-b w-full mb-6"
            />
            <input 
              value={selected.email} 
              onChange={e => setSelected({...selected, email: e.target.value})} 
              className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-4"
              placeholder="Email"
            />
            <input 
              value={selected.phone} 
              onChange={e => setSelected({...selected, phone: e.target.value})} 
              className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-4"
              placeholder="Phone"
            />
            <input 
              value={selected.dob} 
              onChange={e => setSelected({...selected, dob: e.target.value})} 
              className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-4"
              placeholder="Date of Birth"
            />
            <input 
              value={selected.emergencyContact} 
              onChange={e => setSelected({...selected, emergencyContact: e.target.value})} 
              className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-6"
              placeholder="Emergency Contact"
            />

            <select 
              value={selected.membership} 
              onChange={e => setSelected({...selected, membership: e.target.value})} 
              className="bg-zinc-800 px-6 py-4 rounded-2xl w-full mb-6"
            >
              <option>Day Pass</option>
              <option>Monthly</option>
              <option>Annual</option>
            </select>

            <textarea 
              value={selected.notes} 
              onChange={e => setSelected({...selected, notes: e.target.value})} 
              placeholder="Notes / Legal information"
              className="w-full h-32 bg-zinc-800 p-6 rounded-3xl"
            />

            {isAdmin && <button onClick={() => deleteCustomer(selected.id)} className="text-red-400 mt-8">🗑️ Delete Member</button>}
            <button onClick={saveCustomer} className="mt-6 w-full bg-green-500 py-6 rounded-3xl text-xl">Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}
