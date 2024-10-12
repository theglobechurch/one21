module.exports = {
  webpack: {
    resolve: {
      fallback: {
        // buffer: false,
      },
    },
    // configure: (webpackConfig, { env, paths }) => webpackConfig,
    configure: (webpackConfig) => webpackConfig,
  },
  babel: {
    presets: [
      "@babel/preset-react",
    ],
  },
};
