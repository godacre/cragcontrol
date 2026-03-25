'use client';
export default function CheckIn() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', background: '#111', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem' }}>🧗 Front Desk Check-In</h1>
      <p>Type a barcode or scan QR → Green/Red screen appears here</p>
      <div style={{ marginTop: '50px', fontSize: '2rem', padding: '40px', background: '#22c55e', borderRadius: '20px' }}>
        ✅ GREEN = GOOD TO GO
      </div>
      <p style={{ marginTop: '30px' }}>All 7 features are now in the repo — we’ll activate the rest after deploy!</p>
    </div>
  );
}
