const fs = require("fs").promises;

module.exports = function loadRawFile(snowpackConfig, options) {
  return {
    name: "snowpack-plugin-load-raw-file",

    resolve: {
      input: options.input || [".txt"],
      output: [".js"],
    },

    async load({ filePath, fileExt }) {
      const fileContents = await fs.readFile(filePath, "utf-8");
      // console.log({ filePath, fileContents });

      return {
        ".js": `export default ${JSON.stringify(fileContents)};`,
      };
    },
  };
};
