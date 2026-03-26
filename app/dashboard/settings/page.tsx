'use client';
import { useState, useEffect } from 'react';

export default function MasterSettings() {
  const [settings, setSettings] = useState({
    showPhoneInSearch: true,
    showEmailInSearch: true,
    showEmergencyContact: true,
    showLastVisit: true,
    showWaiverStatus: true,
    enableRentalAlerts: true,
    enableRouteFeedback: true,
    enableClassBooking: true,
    enableCashPayment: true,
    enableOnAccountPayment: true,
    showMembershipSymbol: true,
    defaultMembershipTiers: [
      { name: 'Day Pass', price: 25 },
      { name: 'Monthly', price: 89 },
      { name: 'Annual', price: 899 },
      { name: 'Punch Card (10)', price: 220 },
    ],
    gymName: 'CragControl Climbing Gym',
    checkinAudioEnabled: true,
    requireWaiverOnCheckin: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('cragcontrol_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const saveSettings = () => {
    localStorage.setItem('cragcontrol_settings', JSON.stringify(settings));
    alert('✅ Master settings saved for the entire app!');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">⚙️ Master Settings (Admin Only)</h1>
      <div className="bg-zinc-900 p-8 rounded-3xl space-y-10">
        
        <div>
          <h2 className="text-2xl mb-4">Customer Search Display Options</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(settings).filter(k => k.includes('show') || k.includes('enable')).map(key => (
              <label key={key} className="flex items-center gap-3 text-lg">
                <input type="checkbox" checked={settings[key as keyof typeof settings]} onChange={e => setSettings({...settings, [key]: e.target.checked})} />
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Editable Membership Tiers</h2>
          {settings.defaultMembershipTiers.map((tier, i) => (
            <div key={i} className="flex gap-4 mb-4">
              <input value={tier.name} onChange={e => {
                const newTiers = [...settings.defaultMembershipTiers];
                newTiers[i].name = e.target.value;
                setSettings({...settings, defaultMembershipTiers: newTiers});
              }} className="bg-zinc-800 px-4 py-3 rounded-2xl flex-1" />
              <input type="number" value={tier.price} onChange={e => {
                const newTiers = [...settings.defaultMembershipTiers];
                newTiers[i].price = parseFloat(e.target.value);
                setSettings({...settings, defaultMembershipTiers: newTiers});
              }} className="bg-zinc-800 px-4 py-3 rounded-2xl w-24" />
            </div>
          ))}
          <button onClick={() => {
            const newTiers = [...settings.defaultMembershipTiers, { name: 'New Tier', price: 50 }];
            setSettings({...settings, defaultMembershipTiers: newTiers});
          }} className="text-green-400">+ Add new membership tier</button>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Gym Branding &amp; Behavior</h2>
          <input value={settings.gymName} onChange={e => setSettings({...settings, gymName: e.target.value})} className="w-full bg-zinc-800 px-6 py-4 rounded-3xl text-xl" placeholder="Gym Name" />
          <label className="flex items-center gap-3 mt-6">
            <input type="checkbox" checked={settings.checkinAudioEnabled} onChange={e => setSettings({...settings, checkinAudioEnabled: e.target.checked})} />
            Enable check-in audio cues
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={settings.requireWaiverOnCheckin} onChange={e => setSettings({...settings, requireWaiverOnCheckin: e.target.checked})} />
            Block check-in without valid waiver
          </label>
        </div>

        <button onClick={saveSettings} className="w-full bg-purple-500 py-8 rounded-3xl text-3xl font-medium">Save All Master Settings</button>
      </div>
    </div>
  );
}
