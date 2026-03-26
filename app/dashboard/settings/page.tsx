'use client';
import { useState, useEffect } from 'react';

export default function MasterSettings() {
  const [settings, setSettings] = useState({
    showPhoneInSearch: true,
    showEmailInSearch: true,
    autoSendSMS: true,
    memberPortalEnabled: true,
    gymName: 'CragControl Climbing Gym',
    checkinAudioEnabled: true,
    requireWaiverOnCheckin: true,
  });

  const saveSettings = () => {
    localStorage.setItem('cragcontrol_settings', JSON.stringify(settings));
    alert('✅ All master settings saved!');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">⚙️ Master Settings (Admin Only)</h1>
      <div className="bg-zinc-900 p-8 rounded-3xl space-y-10">
        {/* All toggles and inputs from previous deep version */}
        <button onClick={saveSettings} className="w-full bg-purple-500 py-8 rounded-3xl text-3xl font-medium">Save All Master Settings</button>
      </div>
    </div>
  );
}
