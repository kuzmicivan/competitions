const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontendNav: true,
  cacheStartUrl: true,
  fallbacks: {
    document: "/~offline"
  },
});

module.exports = withPWA({});