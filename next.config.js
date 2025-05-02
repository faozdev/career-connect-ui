/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Turbopack'i devre dışı bırakıp standart webpack'e dönüş
    experimental: {
      // turbo: false,
      // appDir: true
    }
  };
  
  module.exports = nextConfig;