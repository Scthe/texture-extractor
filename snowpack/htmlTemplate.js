const fs = require("fs");
const template = require("lodash.template");

module.exports = function (snowpackConfig, options) {
  return {
    name: "snowpack-plugin-html-template",
    resolve: {
      input: [".html"],
      output: [".html"],
    },
    async load({ filePath, fileExt }) {
      const source = fs.readFileSync(filePath, "utf-8");
      const compiled = template(source);
      return compiled({
        addGA: snowpackConfig.mode === "production",
      });
    },
  };
};
