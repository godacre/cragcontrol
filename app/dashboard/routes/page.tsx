'use client';
import { useState } from 'react';

export default function RouteSetting() {
  const [routes, setRoutes] = useState([
    { id: 1, wall: 'Main Boulder Wall', grade: 'V4', setter: 'Sarah Chen', setDate: '2026-03-24', sends: 12, avgRating: 4.3 },
    { id: 2, wall: 'Lead Wall Section B', grade: '5.11c', setter: 'Mike Torres', setDate: '2026-03-22', sends: 8, avgRating: 4.8 },
  ]);

  const [newSend, setNewSend] = useState({ routeId: 1, climber: 'Matthew Goodacre', rating: 5, feedback: '' });

  const logSend = () => {
    const updated = routes.map(r => r.id === newSend.routeId ? {...r, sends: r.sends + 1, avgRating: (r.avgRating * r.sends + newSend.rating) / (r.sends + 1)} : r);
    setRoutes(updated);
    alert(`✅ Send logged for ${newSend.climber} – ${newSend.rating} stars!`);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🪨 Route Setting Management</h1>
      
      <div className="bg-zinc-900 p-8 rounded-3xl mb-12">
        <h2 className="text-2xl mb-6">Current Routes &amp; Sets</h2>
        {routes.map(r => (
          <div key={r.id} className="flex justify-between py-6 border-b border-zinc-700">
            <div>
              <span className="font-medium">{r.wall}</span> <span className="text-green-400">({r.grade})</span>
              <div className="text-sm text-zinc-400">Set by {r.setter} • {r.setDate}</div>
            </div>
            <div className="text-right">
              <div>{r.sends} sends • {r.avgRating.toFixed(1)}★ avg</div>
            </div>
          </div>
        ))}
      </div>

      {/* Climber Send Logger */}
      <div className="bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">Log a Send (Member Facing Simulation)</h2>
        <select value={newSend.routeId} onChange={e => setNewSend({...newSend, routeId: parseInt(e.target.value)})} className="bg-zinc-800 px-6 py-4 rounded-3xl mb-6 w-full">
          {routes.map(r => <option key={r.id} value={r.id}>{r.wall}</option>)}
        </select>
        <input value={newSend.climber} onChange={e => setNewSend({...newSend, climber: e.target.value})} placeholder="Climber Name" className="bg-zinc-800 px-6 py-4 rounded-3xl mb-6 w-full" />
        <div className="flex gap-3 mb-6">
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setNewSend({...newSend, rating: n})} className={`flex-1 py-4 rounded-3xl ${newSend.rating === n ? 'bg-yellow-400 text-black' : 'bg-zinc-800'}`}>{n}★</button>
          ))}
        </div>
        <textarea value={newSend.feedback} onChange={e => setNewSend({...newSend, feedback: e.target.value})} placeholder="Feedback for setter..." className="w-full h-32 bg-zinc-800 p-6 rounded-3xl mb-6" />
        <button onClick={logSend} className="w-full bg-green-500 py-8 rounded-3xl text-2xl">Log Send + Submit Feedback</button>
      </div>
    </div>
  );
}
