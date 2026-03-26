export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">🏔️ CragControl</h1>
        <p className="text-xl mb-8">Your climbing gym operating system</p>
        <div className="space-x-4">
          <a href="/dashboard/checkin" className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl text-xl font-medium inline-block">
            → Front Desk Check-In
          </a>
          <a href="/dashboard/pos" className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-xl font-medium inline-block">
            → Point of Sale
          </a>
        </div>
      </div>
    </div>
  );
}
