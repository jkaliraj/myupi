const { defineConfig } = require("vite");

module.exports = async () => {
  // Dynamically import the ESM-only plugin so this CJS config can still load it
  const pluginReact = await import("@vitejs/plugin-react");
  const homepage = process.env.npm_package_homepage || "";
  const base = homepage ? new URL(homepage).pathname : "/";
  return defineConfig({
    plugins: [pluginReact.default()],
    base: process.env.NODE_ENV === "production" ? base : "/",
  });
};
