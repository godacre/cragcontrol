'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [setupMode, setSetupMode] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const superAdminCreated = localStorage.getItem('cragcontrol_superAdminCreated');
    setSetupMode(!superAdminCreated);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin();
  };

  const handleLogin = () => {
    // Check new users array first
    const users = JSON.parse(localStorage.getItem('cragcontrol_users') || '[]');
    const user = users.find((u: any) => u.password === password);

    if (user) {
      localStorage.setItem('cragcontrol_role', user.role);
      localStorage.setItem('cragcontrol_loggedIn', 'true');
      alert(`Hello, ${user.name}!`);
      router.push('/dashboard/checkin');
      return;
    }

    // Fallback for old single super admin password
    const oldPassword = localStorage.getItem('cragcontrol_superAdminPassword');
    if (password === oldPassword) {
      localStorage.setItem('cragcontrol_role', 'superadmin');
      localStorage.setItem('cragcontrol_loggedIn', 'true');
      alert('Hello! Welcome back Super Admin.');
      router.push('/dashboard/checkin');
      return;
    }

    alert('Incorrect password. Try again.');
  };

  const handleFirstTimeSetup = () => {
    if (!adminName || !adminPassword) {
      alert('Please enter your name and choose a password');
      return;
    }

    const users = [{
      id: Date.now(),
      name: adminName,
      password: adminPassword,
      role: 'superadmin'
    }];

    localStorage.setItem('cragcontrol_users', JSON.stringify(users));
    localStorage.setItem('cragcontrol_superAdminCreated', 'true');
    localStorage.setItem('cragcontrol_role', 'superadmin');
    localStorage.setItem('cragcontrol_loggedIn', 'true');

    alert(`✅ Welcome, ${adminName}! You are now the permanent Super Admin.`);
    router.push('/dashboard/checkin');
  };

  if (setupMode) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="bg-zinc-900 p-10 rounded-3xl max-w-md w-full text-center">
          <h1 className="text-5xl mb-8">🏔️ CragControl</h1>
          <h2 className="text-3xl mb-6">First-Time Setup</h2>
          <p className="text-zinc-400 mb-8">
            You are the first person to open the app.<br />
            Create your permanent Super Admin account.
          </p>

          <input
            type="text"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            placeholder="Your Full Name"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
          />

          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Choose a Strong Password"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-8"
          />

          <button
            onClick={handleFirstTimeSetup}
            className="w-full bg-green-500 py-6 rounded-3xl text-2xl font-medium"
          >
            Create Permanent Super Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl max-w-md w-full text-center">
        <h1 className="text-5xl mb-8">🏔️ CragControl</h1>
        <p className="text-xl mb-8">Front Desk Login</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter password (press Enter)"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 py-6 rounded-3xl text-2xl font-medium"
        >
          Login
        </button>

        <p className="text-xs text-zinc-500 mt-8">
          Permanent Super Admin already created
        </p>
      </div>
    </div>
  );
}
