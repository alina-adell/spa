/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/spa" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/spa/" : "",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Отключаем статическую оптимизацию для проблемных страниц
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
