'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [setupMode, setSetupMode] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const router = useRouter();

  // Check if first-time setup is needed
  useEffect(() => {
    const superAdminCreated = localStorage.getItem('cragcontrol_superAdminCreated');
    setSetupMode(!superAdminCreated);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin();
  };

  const handleLogin = () => {
    const savedPassword = localStorage.getItem('cragcontrol_superAdminPassword');
    if (password === savedPassword) {
      localStorage.setItem('cragcontrol_role', 'superadmin');
      localStorage.setItem('cragcontrol_loggedIn', 'true');
      router.push('/dashboard/checkin');
    } else {
      alert('Incorrect password. Try again.');
    }
  };

  const handleFirstTimeSetup = () => {
    if (!adminName || !adminPassword) {
      alert('Please enter your name and choose a password');
      return;
    }

    localStorage.setItem('cragcontrol_superAdminCreated', 'true');
    localStorage.setItem('cragcontrol_superAdminName', adminName);
    localStorage.setItem('cragcontrol_superAdminPassword', adminPassword);
    localStorage.setItem('cragcontrol_role', 'superadmin');
    localStorage.setItem('cragcontrol_loggedIn', 'true');

    alert(`✅ Welcome, ${adminName}! You are now the permanent Super Admin.`);
    router.push('/dashboard/checkin');
  };

  // First-time setup screen
  if (setupMode) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="bg-zinc-900 p-10 rounded-3xl max-w-md w-full text-center">
          <h1 className="text-5xl mb-8">🏔️ CragControl</h1>
          <h2 className="text-3xl mb-6">First-Time Setup</h2>
          <p className="text-zinc-400 mb-8">
            You are the first person to open the app.<br />
            Create your permanent admin account.
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
            Create Permanent Admin Account
          </button>
        </div>
      </div>
    );
  }

  // Normal login screen
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl max
