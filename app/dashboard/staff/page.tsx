'use client';
import { useState, useEffect } from 'react';

export default function StaffManagement() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sarah Chen', role: 'Route Setter', email: 'sarah@cragcontrol.com', active: true },
    { id: 2, name: 'Mike Torres', role: 'Front Desk', email: 'mike@cragcontrol.com', active: true },
    { id: 3, name: 'Emma Patel', role: 'Manager', email: 'emma@cragcontrol.com', active: true },
  ]);

  const [newStaff, setNewStaff] = useState({ name: '', role: 'Front Desk', email: '' });

  const addStaffMember = () => {
    if (newStaff.name) {
      setStaff([...staff, { id: Date.now(), ...newStaff, active: true }]);
      setNewStaff({ name: '', role: 'Front Desk', email: '' });
    }
  };

  const toggleActive = (id: number) => {
    setStaff(staff.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👥 Staff Management (Admin Only)</h1>
      
      <div className="bg-zinc-900 p-8 rounded-3xl mb-12">
        <h2 className="text-2xl mb-6">Add New Employee</h2>
        <div className="grid grid-cols-3 gap-4">
          <input value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} placeholder="Full Name" className="bg-zinc-800 px-6 py-4 rounded-3xl" />
          <select value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} className="bg-zinc-800 px-6 py-4 rounded-3xl">
            <option>Front Desk</option><option>Route Setter</option><option>Manager</option><option>Admin</option>
          </select>
          <input value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} placeholder="Email" className="bg-zinc-800 px-6 py-4 rounded-3xl" />
        </div>
        <button onClick={addStaffMember} className="mt-6 bg-green-500 px-10 py-5 rounded-3xl">Add Staff Member</button>
      </div>

      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">Current Staff</h2>
        {staff.map(s => (
          <div key={s.id} className="flex items-center justify-between border-b border-zinc-700 py-6">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-zinc-400">{s.email} • {s.role}</div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`px-5 py-2 rounded-full text-sm ${s.active ? 'bg-green-500' : 'bg-red-500'}`}>
                {s.active ? 'Active' : 'Inactive'}
              </span>
              <button onClick={() => toggleActive(s.id)} className="text-blue-400 hover:text-blue-300">Toggle Status</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
