// ... keep the rest of the file exactly the same until the navItems array ...

const navItems = [
  { name: 'Check-In', href: '/dashboard/checkin', icon: '🧗' },
  { name: 'Point of Sale', href: '/dashboard/pos', icon: '💰' },
  { name: 'Customers & CRM', href: '/dashboard/customers', icon: '👤' },
  { name: 'Rentals & Inventory', href: '/dashboard/rentals', icon: '📦' },
  { name: 'Classes & Certifications', href: '/dashboard/classes', icon: '📅' },
  { name: 'Route Setting', href: '/dashboard/routes', icon: '🪨' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📊' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // ... keep existing useEffect and logout ...

  const isAdmin = localStorage.getItem('cragcontrol_role') === 'admin';

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">
        {/* header same */}
        <nav className="flex-1 space-y-1">
          {navItems.map(item => ( /* same as before */ ))}
          {isAdmin && (
            <Link href="/dashboard/settings" className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-lg ${pathname === '/dashboard/settings' ? 'bg-purple-500' : 'hover:bg-zinc-800'}`}>
              ⚙️ Master Settings
            </Link>
          )}
        </nav>
        {/* logout same */}
      </div>
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
}
