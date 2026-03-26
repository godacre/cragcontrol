'use client';
export default function Classes() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📅 Classes & Certifications</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-2xl">Today’s Classes</h2>
          <p className="mt-8 text-xl">Intro to Climbing – 6 spots left</p>
          <p className="text-xl">Lead Climbing – Full (bump list active)</p>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-2xl">Certifications</h2>
          <button className="mt-6 w-full bg-green-500 py-6 rounded-3xl text-xl">Log Lead Test Pass</button>
        </div>
      </div>
    </div>
  );
}
