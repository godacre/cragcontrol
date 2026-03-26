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
    // First-time setup check
    const existingAdmin = localStorage.getItem('cragcontrol_adminName');
    if (!existingAdmin) {
      setSetupMode(true);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    const savedAdminPass = localStorage.getItem('cragcontrol_adminPassword');
    if (password === savedAdminPass || password === 'admin123') {
      localStorage.setItem('cragcontrol_role', 'admin');
      localStorage.setItem('cragcontrol_loggedIn', 'true');
      router.push('/dashboard/checkin');
    } else {
      alert('Incorrect password. Demo: admin123');
    }
  };

  const handleFirstTimeSetup = () => {
    if (adminName && adminPassword) {
      localStorage.setItem('cragcontrol_adminName', adminName);
      localStorage.setItem('cragcontrol_adminPassword', adminPassword);
      localStorage.setItem('cragcontrol_role', 'admin');
      localStorage.setItem('cragcontrol_loggedIn', 'true');
      alert(`✅ Welcome, ${adminName}! You are now the first Admin.`);
      router.push('/dashboard/checkin');
    } else {
      alert('Please enter your name and password');
    }
  };

  if (setupMode) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="bg-zinc-900 p-10 rounded-3xl max-w-md w-full text-center">
          <h1 className="text-5xl mb-8">🏔️ CragControl</h1>
          <h2 className="text-3xl mb-8">First-Time Setup</h2>
          <p className="mb-8">You are the first admin. Choose your name and password.</p>
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
            placeholder="Choose a Password"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
          />
          <button onClick={handleFirstTimeSetup} className="w-full bg-green-500 py-6 rounded-3xl text-2xl font-medium">
            Create Admin Account
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
          placeholder="Password (press Enter)"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
        />
        <button onClick={handleLogin} className="w-full bg-green-500 py-6 rounded-3xl text-2xl font-medium">
          Login
        </button>
        <p className="text-xs text-zinc-500 mt-8">First admin already created • Press Enter to login</p>
      </div>
    </div>
  );
}
