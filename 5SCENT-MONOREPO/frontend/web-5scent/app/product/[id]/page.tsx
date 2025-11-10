"use client";
import { useEffect, useState } from 'react';
import { getProduct, postCart } from '../../../lib/api';
import { useRouter } from 'next/navigation';

type Props = { params: { id: string } };

export default function ProductPage({ params }: Props) {
  const id = params.id;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState<'30ml' | '50ml'>('30ml');
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    getProduct(id)
      .then((p) => {
        if (mounted) setProduct(p);
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  const price = size === '30ml' ? product.price_30ml : product.price_50ml;

  async function addToCart() {
    try {
      await postCart({ user_id: null, product_id: product.id, size, quantity: 1 });
      router.push('/cart');
    } catch (e) {
      // fallback to localStorage if API fails
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ product_id: product.id, size, quantity: 1, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      router.push('/cart');
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-6">
      <div className="mx-auto max-w-4xl bg-white p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative h-96 w-full bg-gray-100">
            <img
              src={(product.images && product.images[0]?.image_url) || '/vercel.svg'}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="mt-2 text-sm text-zinc-600">{product.description}</p>
            <div className="mt-4">
              <div className="mb-2 text-sm">Select size</div>
              <div className="flex gap-2">
                <button className={`px-3 py-1 border ${size==='30ml'?'bg-black text-white':''}`} onClick={() => setSize('30ml')}>30ml</button>
                <button className={`px-3 py-1 border ${size==='50ml'?'bg-black text-white':''}`} onClick={() => setSize('50ml')}>50ml</button>
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold">IDR {price}</div>
                <button onClick={addToCart} className="mt-4 rounded bg-black px-4 py-2 text-white">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
