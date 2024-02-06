/** @type {import('next').NextConfig} */
const {
  STRIPE_PUBLIC_KEY,
  HOST,
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    STRIPE_PUBLIC_KEY,
    HOST,
  },
};

module.exports = nextConfig;