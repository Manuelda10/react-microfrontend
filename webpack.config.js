const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "unmsm",
    projectName: "microfrontend-react",
    webpackConfigEnv,
    argv,
  });
  return merge(defaultConfig, {
    externals: {
      // eslint-disable-next-line prettier/prettier
      "react": "react",
      "react-dom": "react-dom",
    },
  });
};
