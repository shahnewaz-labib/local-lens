/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["maps.geoapify.com"], // Add the hostname here
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
