/* eslint-disable prettier/prettier */
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "unmsm",
    projectName: "microfrontend-react",
    webpackConfigEnv,
    argv,
  });

  // Asegúrate de tener las reglas para CSS
  const cssRuleIndex = defaultConfig.module.rules.findIndex(
    (rule) => rule.test && rule.test.test(".css")
  );

  if (cssRuleIndex >= 0) {
    // Agrega postcss-loader a las reglas existentes de CSS
    defaultConfig.module.rules[cssRuleIndex].use.push({
      loader: "postcss-loader",
    });
  } else {
    // Si no hay reglas para CSS, añade una nueva
    defaultConfig.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
    });
  }

  return merge(defaultConfig, {
    externals: {
      // eslint-disable-next-line prettier/prettier
      "react": "react",
      "react-dom": "react-dom",
    },
  });
};
