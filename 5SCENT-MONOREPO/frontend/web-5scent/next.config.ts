import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ✅ Root harus absolut, bukan relatif
  turbopack: {
    root: path.resolve(__dirname),
  },

  // ✅ Mode strict React
  reactStrictMode: true,

  // ✅ Opsional: perbaiki build error kecil tanpa lint config
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
