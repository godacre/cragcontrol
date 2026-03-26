export default function Reports() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📊 Reports</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-8 rounded-3xl text-center">
          <div className="text-6xl font-bold">$4,872</div>
          <div className="text-zinc-400">Today’s Revenue</div>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl text-center">
          <div className="text-6xl font-bold">142</div>
          <div className="text-zinc-400">Check-ins (peak 6–8pm)</div>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl text-center">
          <div className="text-6xl font-bold">68%</div>
          <div className="text-zinc-400">Retail vs Membership split</div>
        </div>
      </div>
    </div>
  );
}
