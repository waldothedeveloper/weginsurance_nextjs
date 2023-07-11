/** @type {import('next').NextConfig} */
import { dirname } from "path";
import { fileURLToPath } from "url";
import nextBuildId from "next-build-id";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  // experimental: {
  //   appDir: true,
  //   instrumentationHook: true,
  // },
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
      {
        protocol: "https",
        hostname: "api.twilio.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
