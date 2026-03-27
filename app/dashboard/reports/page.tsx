'use client';
import { useState, useEffect } from 'react';

export default function Reports() {
  const [sales, setSales] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem('cragcontrol_sales') || '[]');
    const savedCustomers = JSON.parse(localStorage.getItem('cragcontrol_customers') || '[]');
    setSales(savedSales);
    setCustomers(savedCustomers);
  }, []);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  // Traffic Analytics
  const now = new Date();
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - 7);

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisYearStart = new Date(now.getFullYear(), 0, 1);

  let weeklyVisits = 0;
  let monthlyVisits = 0;
  let yearlyVisits = 0;

  customers.forEach(customer => {
    if (!customer.visits) return;
    customer.visits.forEach((visitStr: string) => {
      const visitDate = new Date(visitStr);
      if (visitDate >= thisWeekStart) weeklyVisits++;
      if (visitDate >= thisMonthStart) monthlyVisits++;
      if (visitDate >= thisYearStart) yearlyVisits++;
    });
  });

  const closeOutDay = () => {
    const printContent = `
      <h1>Daily Close-Out Report – ${now.toLocaleDateString()}</h1>
      <p><strong>Total Revenue:</strong> $${totalRevenue.toFixed(2)}</p>
      <p><strong>Transactions:</strong> ${sales.length}</p>
      <hr>
      <p><strong>Traffic This Week:</strong> ${weeklyVisits} visits</p>
      <p><strong>Traffic This Month:</strong> ${monthlyVisits} visits</p>
      <p><strong>Traffic This Year:</strong> ${yearlyVisits} visits</p>
    `;
    const printWin = window.open('', '_blank');
    printWin?.document.write(printContent);
    printWin?.document.close();
    printWin?.print();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📊 Reports</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-8 rounded-3xl text-center">
          <div className="text-6xl font-bold">${totalRevenue.toFixed(2)}</div>
          <div className="text-zinc-400">Total Revenue</div>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl text-center">
          <div className="text-6xl font-bold">{weeklyVisits}</div>
          <div className="text-zinc-400">Visits This Week</div>
        </div>
        <div className="bg-zinc-900 p-8 rounded-3xl text-center">
          <div className="text-6xl font-bold">{monthlyVisits}</div>
          <div className="text-zinc-400">Visits This Month</div>
        </div>
      </div>

      <div className="mt-8 bg-zinc-900 p-8 rounded-3xl">
        <h2 className="text-2xl mb-6">Traffic Summary</h2>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-5xl font-bold text-green-400">{weeklyVisits}</div>
            <div className="text-zinc-400">This Week</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-green-400">{monthlyVisits}</div>
            <div className="text-zinc-400">This Month</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-green-400">{yearlyVisits}</div>
            <div className="text-zinc-400">This Year</div>
          </div>
        </div>
      </div>

      <button onClick={closeOutDay} className="mt-12 bg-white text-black px-12 py-6 rounded-3xl text-2xl">
        Close Out Day &amp; Print Full Report
      </button>
    </div>
  );
}
