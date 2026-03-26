'use client';
import { useState, useEffect } from 'react';

export default function Staff() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sarah Chen', email: 'sarah@cragcontrol.com', role: 'admin' },
    { id: 2, name: 'Mike Torres', email: 'mike@cragcontrol.com', role: 'staff' },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'staff' });

  useEffect(() => {
    const role = localStorage.getItem('cragcontrol_role');
    setIsAdmin(role === 'admin');
  }, []);

  const addEmployee = () => {
    if (newStaff.name) {
      setStaff([...staff, { id: Date.now(), ...newStaff }]);
      setNewStaff({ name: '', email: '', role: 'staff' });
    }
  };

  const changeRole = (id: number, newRole: string) => {
    setStaff(staff.map(s => s.id === id ? { ...s, role: newRole } : s));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👥 Staff & Employees {isAdmin && '(Admin Only)'}</h1>
      
      {isAdmin && (
        <div className="bg-zinc-900 p-8 rounded-3xl mb-12">
          <h2 className="text-2xl mb-6">Add New Employee</h2>
          <div className="grid grid-cols-3 gap-4">
            <input value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} placeholder="Full Name" className="bg-zinc-800 px-6 py-4 rounded-3xl" />
            <input value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} placeholder="Email" className="bg-zinc-800 px-6 py-4 rounded-3xl" />
            <button onClick={addEmployee} className="bg-green-500 text-white py-4 rounded-3xl">Add Employee</button>
          </div>
        </div>
      )}

      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">Current Staff</h2>
        {staff.map(s => (
          <div key={s.id} className="flex justify-between items-center border-b border-zinc-700 py-6">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-zinc-400">{s.email}</div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={s.role}
                onChange={e => changeRole(s.id, e.target.value)}
                className="bg-zinc-800 px-6 py-3 rounded-3xl"
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
