import browser from "webextension-polyfill";

const { sync, local } = browser.storage;

export const SyncStorage = {
  /**
   * @param {*} data
   * @returns {Promise}
   */
  set(data) {
    return sync.set(data);
  },

  /**
   * @param {string} key
   * @returns {Promise}
   */
  get(key = null) {
    return sync.get(key);
  },
};

export const LocalStorage = {
  /**
   * @param {*} data
   * @returns {Promise}
   */
  set(data) {
    return local.set(data);
  },

  /**
   * @param {string} key
   * @returns {Promise}
   */
  get(key = null) {
    return local.get(key);
  },
};
