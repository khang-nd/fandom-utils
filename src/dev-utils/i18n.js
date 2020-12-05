import i18n from "../data/i18n.json";

export default (function getLanguage() {
  let lang = navigator.language || navigator.userLanguage;
  lang = lang.toLowerCase();
  lang = i18n[lang] ? lang : lang.split("-")[0]; // 'pt-br' or 'pt'
  return i18n[lang] || i18n.en;
})();
