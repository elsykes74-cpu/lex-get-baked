/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

module.exports = nextConfig;
