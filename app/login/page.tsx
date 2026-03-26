'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if this is first-time setup
  const checkFirstTime = async () => {
    const res = await fetch('/api/employees/count', { cache: 'no-store' });
    const { count } = await res.json();
    setIsFirstTime(count === 0);
  };

  // Run on mount
  useState(() => { checkFirstTime(); });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, fullName: isFirstTime ? fullName : undefined }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('cragcontrol_loggedIn', 'true');
      localStorage.setItem('cragcontrol_employeeId', data.employeeId);
      localStorage.setItem('cragcontrol_isAdmin', data.isAdmin.toString());
      router.push('/dashboard/checkin');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl max-w-md w-full text-center">
        <h1 className="text-5xl mb-8">CragControl</h1>
        
        {isFirstTime ? (
          <>
            <h2 className="text-3xl mb-8">Create Employee #1 (Admin)</h2>
            <p className="mb-8 text-zinc-400">You are the very first admin.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
                required
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
                required
              />
              <button type="submit" className="w-full bg-green-500 py-6 rounded-3xl text-2xl font-medium">
                Create Admin Account
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-xl mb-8">Front Desk Login</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-8 py-6 text-2xl mb-6"
                required
              />
              <button type="submit" className="w-full bg-green-500 py-6 rounded-3xl text-2xl font-medium">
                Login
              </button>
            </form>
          </>
        )}

        {error && <p className="text-red-500 mt-6">{error}</p>}
      </div>
    </div>
  );
}
