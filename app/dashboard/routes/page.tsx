'use client';
export default function Routes() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🪨 Route Setting</h1>
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">This Week’s Sets</h2>
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>Wall A – Boulder reset</div>
            <div className="text-green-400">Set by: Sarah (today)</div>
          </div>
          <div className="flex justify-between">
            <div>Lead Wall – 5.11c</div>
            <div className="text-yellow-400">Due to strip: Friday</div>
          </div>
        </div>
        <button className="mt-10 w-full bg-white text-black py-6 rounded-3xl text-xl">Member Send Logger (rate & feedback)</button>
      </div>
    </div>
  );
}
