/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем output: 'export' для обычной сборки
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
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
