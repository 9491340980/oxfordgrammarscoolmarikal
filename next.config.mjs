/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site in ./out — host it free (Firebase, Cloudflare, etc.)
  output: "export",
  // The static host can't run Next's image optimizer, so emit plain <img> tags.
  images: { unoptimized: true },
  // Static hosts serve folders; trailing slashes make routing reliable.
  trailingSlash: true,
};

export default nextConfig;
