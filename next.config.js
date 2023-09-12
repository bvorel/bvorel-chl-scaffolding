const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({});

const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    domains: ["source.unsplash.com"],
  },
};

module.exports = nextConfig;
