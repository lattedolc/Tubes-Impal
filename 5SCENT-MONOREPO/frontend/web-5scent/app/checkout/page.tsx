"use client";
import { useEffect, useState } from 'react';
import { postOrder } from '../../lib/api';

export default function CheckoutPage() {
  const [items, setItems] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('cart') || '[]';
    setItems(JSON.parse(raw));
  }, []);

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

  async function submit() {
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        user_id: null,
        shipping_address: address,
        items: items.map((it) => ({ product_id: it.product_id, size: it.size, quantity: it.quantity, price: it.price })),
        payment: { method: 'QRIS', amount: total },
      };

      const res = await postOrder(payload);
      setMessage('Order created. ID: ' + (res.order?.id || 'unknown'));
      localStorage.removeItem('cart');
      setItems([]);
    } catch (e: any) {
      setMessage('Failed to create order: ' + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-6">
      <div className="mx-auto max-w-3xl bg-white p-6">
        <h2 className="text-xl font-semibold">Checkout</h2>
        <div className="mt-4">
          <label className="block text-sm">Shipping address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded border p-2" />
        </div>

        <div className="mt-4">
          <div className="text-sm">Items: {items.length}</div>
          <div className="text-lg font-bold">Total: IDR {total}</div>
        </div>

        <div className="mt-6">
          <button disabled={loading || !address} onClick={submit} className="rounded bg-black px-4 py-2 text-white">
            {loading ? 'Processing...' : 'Confirm & Pay (mock)'}
          </button>
        </div>

        {message && <div className="mt-4 text-sm">{message}</div>}
      </div>
    </div>
  );
}
