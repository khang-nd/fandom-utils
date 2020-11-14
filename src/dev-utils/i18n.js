import i18n from "./i18n.json";

export default (function getLanguage() {
  let lang = navigator.language || navigator.userLanguage || "en";
  [lang] = lang.split("-"); // en-US, en-AU, fr-FR etc.
  return i18n[lang];
})();
