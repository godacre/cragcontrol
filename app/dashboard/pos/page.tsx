'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function POS() {
  const [cart, setCart] = useState<any[]>([]);
  const [paymentType, setPaymentType] = useState('card');
  const router = useRouter();

  const products = [ /* same as before */ ];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const completeSale = () => {
    // Save sale for reports
    const sales = JSON.parse(localStorage.getItem('cragcontrol_sales') || '[]');
    sales.push({ date: new Date().toISOString(), total, paymentType, items: cart });
    localStorage.setItem('cragcontrol_sales', JSON.stringify(sales));
    
    alert(`✅ Sale completed with ${paymentType.toUpperCase()}! Data routed to Reports.`);
    setCart([]);
    router.push('/dashboard/reports');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">💰 Point of Sale</h1>
      {/* Products list same as before */}
      <div className="mt-8">
        <label className="block mb-2 text-lg">Payment Type</label>
        <select value={paymentType} onChange={e => setPaymentType(e.target.value)} className="bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-xl w-full">
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="account">On-Account</option>
        </select>
      </div>
      <button onClick={completeSale} className="mt-8 w-full bg-green-500 py-8 rounded-3xl text-3xl font-medium">Complete Sale – ${total.toFixed(2)}</button>
    </div>
  );
}
