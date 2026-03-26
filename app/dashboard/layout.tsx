'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const navItems = [
  { name: 'Check-In', href: '/dashboard/checkin', icon: '🧗' },
  { name: 'Point of Sale', href: '/dashboard/pos', icon: '💰' },
  { name: 'Customers & CRM', href: '/dashboard/customers', icon: '👤' },
  { name: 'Memberships', href: '/dashboard/memberships', icon: '🔑' },
  { name: 'Rentals & Inventory', href: '/dashboard/rentals', icon: '📦' },
  { name: 'Classes & Certifications', href: '/dashboard/classes', icon: '📅' },
  { name: 'Route Setting', href: '/dashboard/routes', icon: '🪨' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📊' },
];

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
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-lg ${pathname === item.href ? 'bg-green-500' : 'hover:bg-zinc-800'}`}>
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="mt-auto text-red-400 hover:text-red-300 py-3">Logout</button>
      </div>
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
}
