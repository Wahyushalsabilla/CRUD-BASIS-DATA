const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "upload.wikimedia.org" },
      { hostname: "i.pinimg.com" },
    ],
  },
};

export default nextConfig;
