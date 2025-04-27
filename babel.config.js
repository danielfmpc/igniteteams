module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@assets": "./src/assets",
            "@routes": "./src/routes",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@styles": "./src/styles",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@contexts": "./src/contexts",
            "@services": "./src/services",
            "@types": "./src/@types",
            "@theme": "./src/theme",
            "@storage": "./src/storage",
          },
        },
      ],
    ],
  };
};
