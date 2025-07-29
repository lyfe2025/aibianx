import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 图片优化配置
  images: {
    domains: ['localhost', 'api.aibianx.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 压缩优化
  compress: true,
  
  // 实验性性能优化
  experimental: {
    optimizePackageImports: ['@/components/ui'],
  },
  
  // 重定向配置（为SEO友好）
  async redirects() {
    return [
      {
        source: '/articles/:slug',
        destination: '/weekly/:slug',
        permanent: true,
      },
    ];
  },
  
  // 安全头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
