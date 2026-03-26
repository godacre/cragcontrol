'use client';
import { useState, useEffect } from 'react';

export default function Classes() {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cragcontrol_classes') || '[]');
    setClasses(saved);
  }, []);

  const saveClasses = (newClasses: any[]) => {
    setClasses(newClasses);
    localStorage.setItem('cragcontrol_classes', JSON.stringify(newClasses));
  };

  const addClass = () => {
    const newClass = {
      id: Date.now(),
      title: 'New Class',
      time: '18:00',
      capacity: 12,
      booked: 0,
      instructor: 'TBD'
    };
    saveClasses([...classes, newClass]);
  };

  const deleteClass = (id: number) => {
    if (confirm('Delete this class?')) {
      saveClasses(classes.filter(c => c.id !== id));
    }
  };

  const updateClass = (id: number, field: string, value: any) => {
    const updated = classes.map(c => c.id === id ? { ...c, [field]: value } : c);
    saveClasses(updated);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📅 Classes &amp; Certifications</h1>
      
      <button onClick={addClass} className="mb-8 bg-green-500 px-8 py-4 rounded-3xl text-xl">
        + Create New Class
      </button>

      <div className="space-y-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-zinc-900 p-8 rounded-3xl">
            <div className="flex justify-between items-start">
              <div>
                <input 
                  value={cls.title} 
                  onChange={e => updateClass(cls.id, 'title', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-b w-full"
                />
                <input 
                  value={cls.time} 
                  onChange={e => updateClass(cls.id, 'time', e.target.value)}
                  className="bg-zinc-800 px-4 py-2 rounded-2xl mt-2"
                />
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{cls.booked}/{cls.capacity}</div>
                <button onClick={() => deleteClass(cls.id)} className="text-red-400 mt-4">Delete Class</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
