module.exports = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    domains: [
      '127.0.0.1'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*', // Proxy to your Laravel backend
      },
    ];
  },
};
