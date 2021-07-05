import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    "@prefresh/snowpack",
    "@snowpack/plugin-dotenv",
    [
      "@snowpack/plugin-typescript",
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: "yarn pnpify tsc" } : {}),
      },
    ],
    ["./snowpack/loadRawFile.js", { input: [".vert", ".frag"] }],
    ["./snowpack/htmlTemplate.js"],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    bundle: false,
    minify: true,
    target: "es2018",
    splitting: true,
    treeshake: true,
    entrypoints: "auto",
    manifest: true,
    sourcemap: true,
  },
  env: {
    APP_NAME: packageJson.name,
    APP_VERSION: packageJson.version,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: "none",
  },
  buildOptions: {
    /* ... */
    sourcemap: true,
    baseUrl: "",
    metaUrlPath: "snowpack", // jekyll does not like files starting with '_'
  },
  alias: {
    react: "preact/compat",
    "react-dom": "preact/compat",
  },
};
