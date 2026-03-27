'use client';
import { useState, useEffect } from 'react';

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cragcontrol_staff');
      setStaff(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setStaff([]);
    }
    const role = localStorage.getItem('cragcontrol_role');
    setIsSuperAdmin(role === 'superadmin');
  }, []);

  const saveStaff = (newStaffList: any[]) => {
    setStaff(newStaffList);
    localStorage.setItem('cragcontrol_staff', JSON.stringify(newStaffList));
  };

  const addEmployee = () => {
    if (!newStaffName) return;
    const newEmployee = {
      id: Date.now(),
      name: newStaffName,
      email: newStaffEmail || '',
      role: 'staff'
    };
    saveStaff([...staff, newEmployee]);
    setNewStaffName('');
    setNewStaffEmail('');
  };

  const changeRole = (id: number, newRole: string) => {
    // Super admin cannot be changed
    if (staff.find(s => s.id === id && s.role === 'superadmin')) return;
    const updated = staff.map(s => s.id === id ? { ...s, role: newRole } : s);
    saveStaff(updated);
  };

  const deleteEmployee = (id: number) => {
    if (confirm('Delete this employee permanently?')) {
      saveStaff(staff.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👥 Staff &amp; Employees</h1>
      
      {isSuperAdmin && (
        <div className="bg-zinc-900 p-8 rounded-3xl mb-12">
          <h2 className="text-2xl mb-6">Add New Employee</h2>
          <div className="flex gap-4">
            <input 
              value={newStaffName} 
              onChange={e => setNewStaffName(e.target.value)} 
              placeholder="Full Name" 
              className="flex-1 bg-zinc-800 px-6 py-4 rounded-3xl"
            />
            <input 
              value={newStaffEmail} 
              onChange={e => setNewStaffEmail(e.target.value)} 
              placeholder="Email (optional)" 
              className="flex-1 bg-zinc-800 px-6 py-4 rounded-3xl"
            />
            <button onClick={addEmployee} className="bg-green-500 px-10 py-4 rounded-3xl">Add Employee</button>
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
            <div className="flex items-center gap-6">
              <select 
                value={s.role}
                onChange={e => changeRole(s.id, e.target.value)}
                className="bg-zinc-800 px-6 py-3 rounded-3xl"
                disabled={s.role === 'superadmin'}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="superadmin" disabled>Super Admin</option>
              </select>
              {isSuperAdmin && s.role !== 'superadmin' && (
                <button onClick={() => deleteEmployee(s.id)} className="text-red-400">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
