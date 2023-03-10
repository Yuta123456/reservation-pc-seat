/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          titleProp: true,
          titleId: "filePath",
        },
      },
    });

    return config;
  },
  images: {
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
