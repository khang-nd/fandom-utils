import browser from "webextension-polyfill";
import pkg from "../package.json";

function togglePopup(url) {
  const isFandom = /https:\/\/.*\.fandom\.com\/.*/.test(url);
  browser.browserAction.setPopup({
    popup: isFandom ? "popup.html" : "",
  });
}

const { tabs } = browser;
browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    tabs.create({
      url: pkg.repository.url,
      active: false,
    });
  }
});

tabs.onActivated.addListener(() => {
  tabs
    .query({ active: true, currentWindow: true })
    .then(([tab]) => togglePopup(tab.url));
});

tabs.onUpdated.addListener((_, __, tab) => togglePopup(tab.url));
