/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем статический экспорт для development
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
