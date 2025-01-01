/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.hoanghamobile.com",
      "cdn1.hoanghamobile.com",
      "hoanghamobile.com",
      "admin.hoanghamobile.com",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
