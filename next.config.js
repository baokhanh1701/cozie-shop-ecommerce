/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com", "items-images-production.s3.us-west-2.amazonaws.com", "t4.ftcdn.net"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
