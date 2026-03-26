'use client';
import { useState } from 'react';

export default function Customers() {
  const [customers] = useState([
    { id: 1, name: 'Alex Rivera', email: 'alex@example.com', membership: 'Monthly', waiver: true, notes: 'Lead certified – very strong climber' },
    { id: 2, name: 'Jordan Kim', email: 'jordan@example.com', membership: 'Expired', waiver: false, notes: 'Needs to retake belay test' },
  ]);
  const [selected, setSelected] = useState<any>(null);
  const [signatureData, setSignatureData] = useState<string>('');

  const canvasRef = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#22c55e';
      }
    }
  };

  const saveSignature = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) setSignatureData(canvas.toDataURL());
  };

  const clearSignature = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">👤 Customers & CRM</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Customer List */}
        <div className="bg-zinc-900 p-6 rounded-3xl">
          <h2 className="text-2xl mb-6">All Customers</h2>
          {customers.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="w-full text-left p-5 hover:bg-zinc-800 rounded-2xl mb-3 flex justify-between"
            >
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-zinc-400">{c.email}</div>
              </div>
              <div className={`px-4 py-1 rounded-full text-sm ${c.waiver ? 'bg-green-500' : 'bg-red-500'}`}>
                {c.waiver ? 'Waiver OK' : 'No Waiver'}
              </div>
            </button>
          ))}
        </div>

        {/* Profile + Waiver */}
        {selected && (
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h2 className="text-3xl mb-2">{selected.name}</h2>
            <p className="text-zinc-400 mb-6">{selected.email}</p>
            <p className="mb-4"><strong>Notes:</strong> {selected.notes}</p>

            {/* Digital Waiver */}
            <div className="border border-zinc-700 p-6 rounded-3xl mb-6">
              <h3 className="text-xl mb-4">Digital Waiver Signature</h3>
              <canvas ref={canvasRef} width="600" height="200" className="border border-dashed border-zinc-600 rounded-2xl bg-white w-full" />
              <div className="flex gap-3 mt-4">
                <button onClick={saveSignature} className="flex-1 bg-green-500 py-4 rounded-2xl text-lg">Save Signature</button>
                <button onClick={clearSignature} className="flex-1 bg-zinc-700 py-4 rounded-2xl text-lg">Clear</button>
              </div>
              {signatureData && <p className="text-green-400 text-sm mt-3">✅ Signature saved (demo)</p>}
            </div>

            <button className="w-full bg-white text-black py-6 rounded-3xl text-xl font-medium">Save Profile + Notes</button>
          </div>
        )}
      </div>
    </div>
  );
}
