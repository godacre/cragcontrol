'use client';
import { useState, useEffect } from 'react';

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('temp123');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('cragcontrol_users') || '[]');
    setStaff(users);

    const role = localStorage.getItem('cragcontrol_role');
    setIsSuperAdmin(role === 'superadmin');
  }, []);

  const saveUsers = (newUsers: any[]) => {
    localStorage.setItem('cragcontrol_users', JSON.stringify(newUsers));
    setStaff(newUsers);
  };

  const addNewStaff = () => {
    if (!newName) return alert('Please enter a name');

    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail || '',
      password: newPassword,
      role: 'admin'
    };

    const updatedUsers = [...staff, newUser];
    saveUsers(updatedUsers);

    alert(`✅ New Admin created!\nName: ${newName}\nDefault Password: ${newPassword}\nThey can now log in.`);
    setNewName('');
    setNewEmail('');
  };

  const changeRole = (id: number, newRole: string) => {
    // Protect Super Admin
    const superAdmin = staff.find(u => u.role === 'superadmin');
    if (superAdmin && superAdmin.id === id) {
      alert('Super Admin role cannot be changed');
      return;
    }

    const updated = staff.map(u => u.id === id ? { ...u, role: newRole } : u);
    saveUsers(updated);
  };

  const deleteUser = (id: number) => {
    const user = staff.find(u => u.id === id);
    if (user && user.role === 'superadmin') {
      alert('You cannot delete the Super Admin');
      return;
    }
    if (confirm('Delete this user permanently?')) {
      saveUsers(staff.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👥 Staff &amp; Employees</h1>

      {isSuperAdmin && (
        <div className="bg-zinc-900 p-8 rounded-3xl mb-12">
          <h2 className="text-2xl mb-6">Add New Staff / Admin</h2>
          <div className="grid grid-cols-3 gap-4">
            <input 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              placeholder="Full Name" 
              className="bg-zinc-800 px-6 py-4 rounded-3xl"
            />
            <input 
              value={newEmail} 
              onChange={e => setNewEmail(e.target.value)} 
              placeholder="Email (optional)" 
              className="bg-zinc-800 px-6 py-4 rounded-3xl"
            />
            <button 
              onClick={addNewStaff} 
              className="bg-green-500 text-white py-4 rounded-3xl font-medium"
            >
              Add User
            </button>
          </div>
          <p className="text-xs text-zinc-400 mt-4">Default password is "temp123" — they can change it later</p>
        </div>
      )}

      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">All Users</h2>
        {staff.map(u => (
          <div key={u.id} className="flex justify-between items-center border-b border-zinc-700 py-6">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-zinc-400">{u.email || 'No email'}</div>
              <div className="text-xs text-zinc-500">Role: {u.role}</div>
            </div>
            <div className="flex items-center gap-6">
              <select 
                value={u.role}
                onChange={e => changeRole(u.id, e.target.value)}
                className="bg-zinc-800 px-6 py-3 rounded-3xl"
                disabled={u.role === 'superadmin'}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="superadmin" disabled>Super Admin</option>
              </select>
              {isSuperAdmin && u.role !== 'superadmin' && (
                <button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-500">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
