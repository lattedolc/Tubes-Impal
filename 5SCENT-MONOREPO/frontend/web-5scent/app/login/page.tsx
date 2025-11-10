import type { Metadata } from 'next';
import ProductCarousel from '../components/ProductCarousel';

export const metadata: Metadata = {
  title: '5Scent - Login',
  description: 'Login to 5Scent perfume e-commerce',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side with carousel */}
      <div className="hidden md:block md:w-1/2 bg-black">
        <ProductCarousel />
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex flex-col min-h-screen bg-white">
        {/* Top navigation */}
        <nav className="flex justify-end p-6 gap-2">
          <a href="/" className="px-6 py-2 text-gray-700 hover:text-black transition-colors">Home</a>
          <a href="/signup" className="px-6 py-2 text-gray-700 hover:text-black transition-colors">Sign Up</a>
          <a href="/login" className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-black transition-colors">Login</a>
        </nav>

        {/* Logo and form */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-12">
              <img src="/images/logo_5Scent.jpg" alt="5Scent" className="w-12 h-12 rounded-full object-cover" />
              <div className="text-xl font-extrabold text-black">5Scent</div>
            </div>

            {/* Welcome text */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Hi Scent Lover</h1>
              <p className="text-gray-600 text-lg">Welcome to 5Scent</p>
            </div>

            {/* Login form */}
            <form className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow text-base"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow text-base"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white rounded-lg font-semibold text-base hover:bg-gray-900 transition-colors"
              >
                Login
              </button>
            </form>

            {/* Sign up link */}
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-black font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}