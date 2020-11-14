// generate public/manifest.json

const fs = require("fs");
const pkg = require("./package.json");
const content = {
  name: "Fandom Utils",
  version: pkg.version,
  description: pkg.description,
  homepage_url: pkg.repository.url,
  manifest_version: 2,
  icons: {
    128: "images/icon.png",
  },
  permissions: ["storage", "tabs"],
  background: {
    scripts: ["build/background.js"],
    persistent: false,
  },
  browser_action: {},
  options_ui: {
    page: "options.html",
    open_in_tab: true,
  },
  content_scripts: [
    {
      matches: ["https://*.fandom.com/*"],
      js: ["build/utils.js"],
    },
  ],
};

fs.writeFile(
  __dirname + "/public/manifest.json",
  JSON.stringify(content),
  () => {}
);
