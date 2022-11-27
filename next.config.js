/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: [
      "picsum.photos",
      "naszsklep-api.vercel.app",
      "media.graphassets.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
