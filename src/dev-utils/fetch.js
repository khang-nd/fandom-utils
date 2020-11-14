const origin = "https://dev.fandom.com";
const corsProxy = "https://cors-fandom.herokuapp.com/";

/**
 * Fetch the file's content and return as raw text.
 * 
 * @param {string} file
 * @return {Promise<string>}
 */
export default function (file) {
  const useProxy = origin !== window.location.origin;
  let url = origin + `/wiki/MediaWiki:${file}?action=raw`;
  url = useProxy ? corsProxy + url : url;

  return fetch(url, {
    method: "GET",
    headers: { "x-requested-with": "fandom-utils" },
  }).then((json) => json.text());
}
