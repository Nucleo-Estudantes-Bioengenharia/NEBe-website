import type { NextConfig } from "next";

// Prefixo de caminho usado quando o site é servido numa subpasta
// (ex.: https://<org>.github.io/NEBe-website). Vazio = raiz do domínio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
