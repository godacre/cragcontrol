'use client';
import { useState } from 'react';

export default function POS() {
  const [cart, setCart] = useState<any[]>([]);
  const [paymentType, setPaymentType] = useState('card');

  const products = [
    { id: 1, name: 'Mammut Chalk 300g', price: 8.99 },
    { id: 2, name: 'Climbing Tape 2pk', price: 6.49 },
    { id: 3, name: 'La Sportiva Mythos VS', price: 129.00 },
    { id: 4, name: 'Petzl Harness', price: 89.00 },
    { id: 5, name: 'Gift Card $50', price: 50.00 },
  ];

  const addToCart = (product: any) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const completeSale = () => {
    alert(`✅ Sale completed with ${paymentType.toUpperCase()}!\nTotal: $${total.toFixed(2)}`);
    setCart([]);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">💰 Point of Sale</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Products */}
        <div>
          <h2 className="text-2xl mb-6">Retail Items & Rentals</h2>
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="block w-full text-left bg-zinc-900 hover:bg-zinc-800 p-6 rounded-3xl mb-3 text-xl"
            >
              {p.name} – ${p.price}
            </button>
          ))}
        </div>

        {/* Cart */}
        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-2xl mb-6">Cart ({cart.length} items)</h2>
          
          {cart.map(item => (
            <div key={item.cartId} className="flex justify-between items-center py-4 border-b border-zinc-700">
              <span className="text-lg">{item.name}</span>
              <div className="flex items-center gap-6">
                <span className="text-xl font-medium">${item.price}</span>
                <button onClick={() => removeFromCart(item.cartId)} className="text-red-400 hover:text-red-500 text-xl">✕</button>
              </div>
            </div>
          ))}

          {cart.length === 0 && <p className="text-zinc-400 py-8 text-center">Cart is empty</p>}

          <div className="mt-8 text-3xl font-bold">Total: ${total.toFixed(2)}</div>

          {/* Payment Type */}
          <div className="mt-8">
            <label className="block text-lg mb-3">Payment Method</label>
            <select 
              value={paymentType}
              onChange={e => setPaymentType(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-6 py-5 text-xl"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="giftcard">Gift Card</option>
              <option value="account">On Account</option>
            </select>
          </div>

          <button 
            onClick={completeSale}
            disabled={cart.length === 0}
            className="mt-10 w-full bg-green-500 py-7 rounded-3xl text-3xl font-medium disabled:bg-zinc-700"
          >
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
}
