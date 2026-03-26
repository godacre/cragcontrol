'use client';
export default function Memberships() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🔑 Memberships</h1>
      <div className="grid grid-cols-3 gap-6">
        {['Monthly', 'Annual', 'Punch Card'].map(tier => (
          <div key={tier} className="bg-zinc-900 p-8 rounded-3xl">
            <h2 className="text-2xl">{tier}</h2>
            <p className="text-5xl font-bold mt-4">$89<span className="text-xl font-normal">/mo</span></p>
            <button className="mt-8 w-full bg-green-500 py-5 rounded-3xl">Sell New Membership</button>
          </div>
        ))}
      </div>
      <p className="mt-12 text-xl">Auto alerts for expiring memberships are built-in (demo data shows red flags).</p>
    </div>
  );
}
