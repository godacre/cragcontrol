export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">🏔️ CragControl</h1>
        <p className="text-2xl mb-12">Climbing Gym Operating System</p>
        <a
          href="/login"
          className="inline-block bg-green-500 hover:bg-green-600 px-12 py-6 rounded-3xl text-3xl font-medium"
        >
          → Login to Front Desk
        </a>
      </div>
    </div>
  );
}
