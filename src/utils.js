import { SyncStorage, LocalStorage } from "./dev-utils/browser";
import fetch from "./dev-utils/fetch";
import utils from "./list";

const day = 24 * 60 * 60 * 1000; // ms

/**
 * Inject a script or stylesheet with the specified content to the page.
 *
 * @param {string} file The file's name and extension.
 * @param {string} content The content of the file.
 */
function inject(file, content) {
  let elem = file.split(".").pop() === "js" ? "script" : "style";
  elem = document.createElement(elem);
  elem.innerHTML = content;
  document.head.append(elem);
}

/**
 * Process the specified util. Fetch its content and cache in the local storage.
 *
 * @param {*} util The storage area of the util.
 * @param {string} name Identified name of the util.
 * @param {string} file The file's name and extension.
 */
function process(util, name, file) {
  if (util && util[file]) {
    // lazy inject to wait for other onsite scripts
    setTimeout(() => inject(file, util[file]), 500);

    if (Date.now() - util._expiry >= 7 * day) {
      // clear storage after 7 days
      LocalStorage.set({ [name]: null });
    }
  } else {
    fetch(file).then((content) => {
      inject(file, content);
      util[name][file] = content;
      util[name]._expiry = Date.now();
      LocalStorage.set(util);
    });
  }
}

(() => {
  const keys = Object.keys(utils);

  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const getSync = SyncStorage.get(name);
    const getLocal = LocalStorage.get(name);

    Promise.all([getSync, getLocal]).then(([syncStorage, locaStorage]) => {
      let sync = syncStorage[name];
      let local = locaStorage[name];
      let { scripts, styles } = utils[name];

      if (!sync || !sync.enabled) return;

      if (!local) local = { [name]: {} };

      if (utils[name].config) {
        let oOptions = {};
        let sOptions = "";
        let scope = utils[name].config["_scope"];
        const scopedWindow = scope === "window";
        scope = scopedWindow ? "window" : `window.${scope}`;
        Object.keys(utils[name].config)
          .filter((configKey) => configKey !== "_scope")
          .forEach((configKey) => {
            const configVal =
              sync[configKey] != null
                ? sync[configKey]
                : utils[name].config[configKey];
            if (scopedWindow) sOptions += `window.${configKey} = ${configVal};`;
            else oOptions[configKey] = configVal;
          });
        inject(
          "config.js",
          scopedWindow ? sOptions : `${scope}=${JSON.stringify(oOptions)}`
        );
      }

      if (scripts && scripts.length)
        scripts.forEach((file) => process(local, name, file));

      if (styles && styles.length)
        styles.forEach((file) => process(local, name, file));
    });
  }
})();
