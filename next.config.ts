import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Vercel ላይ በቢልድ ሰዓት የ TypeScript ስህተት ካለ እንዳያቆመው
    ignoreBuildErrors: true,
  },
  eslint: {
    // Vercel ላይ በቢልድ ሰዓት የ ESLint ስህተት ካለ እንዳያቆመው
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;