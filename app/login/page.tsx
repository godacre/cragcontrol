'use client';
import { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    localStorage.setItem('cragcontrol_loggedIn', 'true');
    window.location.href = '/dashboard/checkin';
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl max-w-md w-full text-center">
        <h1 className="text-5xl mb-8">🏔️ CragControl</h1>
        <p className="text-xl mb-8">Front Desk Login</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (demo)"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
        />
        <button onClick={handleLogin} className="w-full bg-green-500 py-6 rounded-3xl text-2xl font-medium">Login</button>
      </div>
    </div>
  );
}
