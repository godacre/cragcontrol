'use client';
import { useState, useEffect } from 'react';

export default function Reports() {
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem('cragcontrol_sales') || '[]');
    setSales(savedSales);
  }, []);

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);

  const closeOutDay = () => {
    const printContent = `
      <h1>Daily Close-Out Report - ${new Date().toLocaleDateString()}</h1>
      <p>Total Revenue: $${totalRevenue.toFixed(2)}</p>
      <p>Transactions: ${sales.length}</p>
      <hr>
      ${sales.map(s => `<p>${s.paymentType} - $${s.total}</p>`).join('')}
    `;
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
    
    // Clear for next day (demo)
    localStorage.setItem('cragcontrol_sales', '[]');
    alert('✅ Day closed out and printed!');
    setSales([]);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📊 Reports</h1>
      <div className="bg-zinc-900 p-8 rounded-3xl mb-8">
        <p className="text-6xl font-bold">${totalRevenue.toFixed(2)}</p>
        <p className="text-zinc-400">Today’s Revenue</p>
      </div>
      <button onClick={closeOutDay} className="bg-white text-black px-12 py-6 rounded-3xl text-2xl">Close Out Day & Print Report</button>
    </div>
  );
}
