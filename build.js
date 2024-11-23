const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/app.js"],
  bundle: true,
  outfile: "dist/app.js",
  minify: true,
  sourcemap: true,
  target: "es6",
  platform: "browser",
}).catch(() => process.exit(1));

