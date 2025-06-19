/** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;



// const nextConfig = {
//   output: 'export',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { 
//     unoptimized: true,
//     domains: ['images.pexels.com']
//   },
//   trailingSlash: true,
//   skipTrailingSlashRedirect: true,
// };

// module.exports = nextConfig;

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'res.cloudinary.com']
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
