'use client';
import { useState } from 'react';

export default function Classes() {
  const [classes, setClasses] = useState([
    { id: 1, title: 'Intro to Climbing', time: '6:00 PM', capacity: 12, booked: 8, instructor: 'Sarah Chen' },
    { id: 2, title: 'Lead Climbing Certification', time: '7:30 PM', capacity: 6, booked: 6, instructor: 'Mike Torres' },
  ]);

  const [selectedClass, setSelectedClass] = useState<any>(null);

  const bookSpot = (id: number) => {
    setClasses(classes.map(c => c.id === id ? {...c, booked: Math.min(c.booked + 1, c.capacity)} : c));
    alert('✅ Spot booked! Waitlist active if full.');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📅 Classes & Certifications</h1>
      <div className="grid grid-cols-2 gap-8">
        {classes.map(c => (
          <div key={c.id} className="bg-zinc-900 p-8 rounded-3xl">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl">{c.title}</h2>
                <p className="text-zinc-400">{c.time} • {c.instructor}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{c.booked}/{c.capacity}</div>
                <div className="text-sm text-zinc-400">spots taken</div>
              </div>
            </div>
            <button onClick={() => bookSpot(c.id)} disabled={c.booked >= c.capacity} className="mt-8 w-full bg-green-500 py-6 rounded-3xl disabled:bg-zinc-700">Book Spot</button>
            {c.booked >= c.capacity && <p className="text-red-400 text-center mt-4">Waitlist opened</p>}
          </div>
        ))}
      </div>
      <button className="mt-12 bg-white text-black px-12 py-6 rounded-3xl text-xl">+ Create New Class</button>
    </div>
  );
}
