'use client';
import { useState } from 'react';

export default function POS() {
  const [cart, setCart] = useState<any[]>([]);
  const products = [
    { id: 1, name: 'Mammut Chalk 300g', price: 8.99, barcode: 'CHALK001' },
    { id: 2, name: 'Climbing Tape 2pk', price: 6.49, barcode: 'TAPE002' },
    { id: 3, name: 'La Sportiva Miura VS', price: 129.00, barcode: 'SHOE003' },
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">💰 Point of Sale</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* Products */}
        <div>
          <h2 className="text-2xl mb-4">Retail Items</h2>
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
          <h2 className="text-2xl mb-4">Cart</h2>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-zinc-700">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="mt-8 text-3xl font-bold">Total: ${total.toFixed(2)}</div>
          <button className="mt-8 w-full bg-green-500 py-6 rounded-3xl text-2xl">Complete Sale (Cash / Card / Account)</button>
        </div>
      </div>
    </div>
  );
}
