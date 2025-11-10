import Link from 'next/link';
import Image from 'next/image';

type Product = any;

export default function ProductCard({ product }: { product: Product }) {
  // Try several possible fields for the image URL
  const rawImg = (product.images && product.images.length && product.images[0].image_url)
    || product.image_url
    || product.image
    || product.thumbnail
    || '/vercel.svg';

  // Determine image source: support frontend public (/products/...) or backend storage (/storage/...)
  const backendBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/?$/i, '');
  let img = rawImg;

  if (!rawImg) {
    img = '/vercel.svg';
  } else if (/^https?:\/\//i.test(rawImg)) {
    // absolute URL from DB
    img = rawImg;
  } else if (rawImg.startsWith('/storage')) {
    // backend storage path (e.g. /storage/productimages/...)
    img = (backendBase || '') + rawImg;
  } else {
    // normalize local public product images
    // possible DB values: 'products/foo.jpg', '/products/foo.jpg', 'foo.jpg'
    const cleaned = rawImg.startsWith('/') ? rawImg.slice(1) : rawImg;
    if (cleaned.startsWith('products/') || cleaned.startsWith('product/')) {
      img = '/' + cleaned; // ensure leading slash
    } else if (/\/.+\.[a-zA-Z]{2,4}$/.test(cleaned)) {
      // looks like a filename e.g. 'royal-oud.jpg'
      img = '/products/' + cleaned;
    } else {
      // fallback
      img = '/' + cleaned;
    }
  }

  const id = product.product_id ?? product.id ?? product.id;
  const priceFrom = product.price_30ml ?? product.price_3 ?? product.price_3_0 ?? 0;
  const avg = (product.average_rating !== undefined && product.average_rating !== null) ? product.average_rating : null;

  return (
    <div className="product-card">
      <a href={`/product/${id}`}>
        <div className="image-container">
          <img src={img} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="product-meta">
          <div className="product-category">{product.category}</div>
          <div className="product-title">{product.name}</div>
          <div className="product-price">From Rp {priceFrom.toLocaleString()}</div>
          {avg !== null && (
            <div className="mt-1 text-sm text-amber-600">★ {Number(avg).toFixed(1)}</div>
          )}
        </div>
      </a>
    </div>
  );
}
