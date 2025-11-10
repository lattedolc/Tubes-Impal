import type { Metadata } from 'next';
import ProductCard from './components/ProductCard';
import { getProducts, getTopRated } from '../lib/api';

export const metadata: Metadata = {
  title: '5Scent - Home',
  description: 'Perfume e-commerce home',
};

export default async function Home() {
  // Mock data until API is ready - using exact product names from your DB
  // Ratings from your rating table
  const mockRatings = [
    { rating_id: 1, user_id: 1, product_id: 1, order_id: 1, stars: 4, comment: "Lumayan bagus." },
    { rating_id: 2, user_id: 2, product_id: 2, order_id: 2, stars: 5, comment: "Tahan lama, seminggu masih kecium." },
    { rating_id: 3, user_id: 3, product_id: 4, order_id: 3, stars: 5, comment: "Mahal tapi worth it bangettt." },
    { rating_id: 4, user_id: 4, product_id: 5, order_id: 4, stars: 3, comment: "Kurang menurut saya." },
    { rating_id: 5, user_id: 5, product_id: 3, order_id: 5, stars: 3, comment: "Kurang cocok di saya." }
  ];

  const mockProducts = [
    {
      product_id: 1,
      name: "Ocean Breeze",
      description: "Aroma segar laut untuk siang hari.",
      category: "Day",
      price_30ml: 120000,
      price_50ml: 200000,
      images: [{ image_url: "/products/OceanBreeze30ml.png" }]
    },
    {
      product_id: 2,
      name: "Night Bloom",
      description: "Aroma lembut untuk malam hari.",
      category: "Night", 
      price_30ml: 150000,
      price_50ml: 230000,
      images: [{ image_url: "/products/NightBloom30ml.png" }]
    },
    {
      product_id: 3,
      name: "Citrus Fresh",
      description: "Wangi jeruk menyegarkan.",
      category: "Day",
      price_30ml: 110000,
      price_50ml: 190000,
      images: [{ image_url: "/products/CitrusFresh30ml.png" }]
    },
    {
      product_id: 4,
      name: "Royal Oud",
      description: "Aroma kayu elegan.",
      category: "Night",
      price_30ml: 200000,
      price_50ml: 300000,
      images: [{ image_url: "/products/RoyalOud30ml.png" }]
    },
    {
      product_id: 5,
      name: "Vanilla Sky",
      description: "Wangi manis vanilla lembut.",
      category: "Day",
      price_30ml: 130000,
      price_50ml: 210000,
      images: [{ image_url: "/products/VanillaSky30ml.png" }]
    }
  ];

  // Calculate average rating for each product
  const productRatings = mockProducts.map(product => {
    const ratings = mockRatings.filter(r => r.product_id === product.product_id);
    const average = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
      : 0;
    return {
      ...product,
      average_rating: average,
      ratings: ratings
    };
  });

  let products = productRatings;
  // Sort by rating and get top 2 rated products (rating ≥ 4.5)
  let topRated = productRatings
    .filter(p => p.average_rating >= 4.5)
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, 2);

  // Once API works, uncomment this:
  /*
  try {
    const data = await getProducts();
    products = data.data || data || mockProducts;
  } catch (e) {
    products = mockProducts;
  }

  try {
    const tr = await getTopRated();
    topRated = (tr && (tr.data || tr)) || mockProducts.slice(0,2);
  } catch (e) {
    topRated = mockProducts.slice(0,2);
  }
  */

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container">
        <header className="site-header">
          <div className="logo">
            <img src="/images/logo_5Scent.jpg" alt="5Scent" className="logo-img" />
            <div className="text-lg font-bold !text-black">5Scent</div>
          </div>
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/signup">Sign up</a>
            <a href="/login">Login</a>
          </nav>
        </header>

        <div className="search-row">
          <input placeholder="Search perfumes" type="text" suppressHydrationWarning />
          <select suppressHydrationWarning>
            <option>All Categories</option>
            <option>Day</option>
            <option>Night</option>
          </select>
          <button suppressHydrationWarning>Search</button>
        </div>

        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Loved by Customers</h2>
          </div>          <div className="loved-grid grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2">
            {topRated.slice(0, 2).map((p: any) => (
              <ProductCard key={p.product_id ?? p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Our Products</h2>
          </div>
          <div className="product-grid">
            {products.map((p: any) => (
              <ProductCard key={p.product_id ?? p.id} product={p} />
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <div className="container">© 2025 5Scent</div>
        </footer>
      </div>
    </div>
  );
}
