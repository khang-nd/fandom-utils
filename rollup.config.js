import svelte from "rollup-plugin-svelte";
import css from "rollup-plugin-css-only";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

function output(name) {
  return {
    sourcemap: "inline",
    format: "iife",
    dir: "public/build",
    name,
  };
}

const plugins = [
  // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  resolve({
    browser: true,
    dedupe: ["svelte"],
  }),

  commonjs(),

  json(),

  image(),

  // In dev mode, call `npm run start` once
  // the bundle has been generated
  !production && serve(),

  // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && terser(),
];

export default [
  {
    input: "src/popup.js",
    output: output("popup"),
    plugins: [
      ...plugins,
      svelte({ css: (css) => css.write("popup.css", false) }),
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/options.js",
    output: output("options"),
    plugins: [
      ...plugins,
      css({ output: "public/build/options.css" }),
      svelte(),
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/background.js",
    output: output("background"),
    plugins: [...plugins],
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/utils.js",
    output: output("utils"),
    plugins: [...plugins],
    watch: {
      clearScreen: false,
    },
  },
];
