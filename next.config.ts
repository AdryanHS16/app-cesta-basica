/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Rotas que começam com "/api"
        destination: "http://localhost:3000/:path*", // Redireciona para o backend
      },
    ];
  },
};

module.exports = nextConfig;
