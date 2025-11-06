/** @type {import('next').NextConfig} */
const nextConfig = {
  // Временно отключаем static export для отладки
  // output: 'export',
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
};

module.exports = nextConfig;
