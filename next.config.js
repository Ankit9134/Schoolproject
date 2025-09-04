/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: false
  },
  api: {
    bodyParser: false
  },
  images: { unoptimized: true }
};
module.exports = nextConfig;
