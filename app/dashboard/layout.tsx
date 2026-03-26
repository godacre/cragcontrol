'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('cragcontrol_loggedIn') !== 'true') {
      router.push('/login');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('cragcontrol_loggedIn');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">🏔️</span>
          <h1 className="text-2xl font-bold">CragControl</h1>
        </div>
        <nav className="flex-1 space-y-1">
          <Link href="/dashboard/checkin" className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-lg ${pathname === '/dashboard/checkin' ? 'bg-green-500' : 'hover:bg-zinc-800'}`}>
            🧗 Check-In
          </Link>
          <Link href="/dashboard/pos" className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-lg ${pathname === '/dashboard/pos' ? 'bg-green-500' : 'hover:bg-zinc-800'}`}>
            💰 Point of Sale
          </Link>
        </nav>
        <button onClick={logout} className="mt-auto text-red-400 hover:text-red-300 py-3">Logout</button>
      </div>
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
}
