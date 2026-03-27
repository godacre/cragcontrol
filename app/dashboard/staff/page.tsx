'use client';
import { useState, useEffect } from 'react';

export default function Staff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('staff');

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
    if (!newName || !newUsername || !newPassword) {
      alert('Please fill in Name, Username, and Password');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: newName,
      username: newUsername,
      password: newPassword,
      role: newRole
    };

    saveUsers([...staff, newUser]);
    setNewName('');
    setNewUsername('');
    setNewPassword('');

    alert(`✅ New ${newRole} account created!\nUsername: ${newUsername}\nPassword: ${newPassword}`);
  };

  const changeRole = (id: number, newRole: string) => {
    const user = staff.find(u => u.id === id);
    if (user && user.role === 'superadmin') {
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
      <h1 className="text-4xl font-bold mb-8">👥 Staff Management</h1>

      {isSuperAdmin && (
        <div className="bg-zinc-900 p-8 rounded-3xl mb-12">
          <h2 className="text-2xl mb-6">Add New Staff / Admin</h2>
          <div className="grid grid-cols-2 gap-4">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full Name" className="bg-zinc-800 px-6 py-4 rounded-3xl" />
            <input value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="Username (for login)" className="bg-zinc-800 px-6 py-4 rounded-3xl" />
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Password" className="bg-zinc-800 px-6 py-4 rounded-3xl" />
            <select value={newRole} onChange={e => setNewRole(e.target.value)} className="bg-zinc-800 px-6 py-4 rounded-3xl">
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button onClick={addNewStaff} className="mt-6 bg-green-500 px-10 py-4 rounded-3xl text-xl w-full">Create New User</button>
        </div>
      )}

      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">All Users</h2>
        {staff.map(u => (
          <div key={u.id} className="flex justify-between items-center border-b border-zinc-700 py-6">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-zinc-400">Username: {u.username}</div>
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
                <button onClick={() => deleteUser(u.id)} className="text-red-400">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
