"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

type CartItem = { id?: number; product_id: number; size: string; quantity: number; price?: number; product?: any };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  async function load() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
        return;
      }
    } catch (e) {
      // ignore
    }

    // fallback to localStorage
    const raw = localStorage.getItem('cart') || '[]';
    setItems(JSON.parse(raw));
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(idx: number) {
    const it = items[idx];
    if (it?.id) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${it.id}`, { method: 'DELETE' });
      } catch (e) {
        // ignore
      }
      await load();
      return;
    }

    const copy = [...items];
    copy.splice(idx, 1);
    setItems(copy);
    localStorage.setItem('cart', JSON.stringify(copy));
  }

  const total = items.reduce((s, it) => s + (it.price || 0) * it.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-6">
      <div className="mx-auto max-w-4xl bg-white p-6">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        {items.length === 0 ? (
          <div className="mt-4">Your cart is empty. <Link href="/">Go shopping</Link></div>
        ) : (
          <div className="mt-4">
            <ul className="space-y-4">
              {items.map((it, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div>
                    <div>Product ID: {it.product_id}</div>
                    <div className="text-sm text-zinc-600">Size: {it.size}</div>
                    <div className="text-sm">Qty: {it.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div>IDR {it.price || '-'}</div>
                    <button onClick={() => remove(i)} className="mt-2 text-sm text-red-600">Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-lg font-bold">Total: IDR {total}</div>
              <Link href="/checkout">
                <a className="rounded bg-black px-4 py-2 text-white">Checkout</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
