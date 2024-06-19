/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  },
    swcMinify: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
      domains: [
        'images.unsplash.com',
        'i.ibb.co',
        'scontent.fotp8-1.fna.fbcdn.net',
      ],
      // Make ENV
      unoptimized: true,
    },
  };
  
  // module.exports = withTM(nextConfig);
export default nextConfig;
  