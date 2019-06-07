import DefaultValues from './DefaultValues.js';

export default class PersistenceManager {
  constructor() {
    this._storageNames = {
      profilePrefix: 'profilePrefix',
      profilePrefixSeparator: 'profilePrefixSeparator',
      userWindowTitle: 'title',
    };
  }

  async getProfilePrefix() {
    const profilePrefixStorageObject = await browser.storage.local
      .get({ [this._storageNames.profilePrefix]: DefaultValues.profilePrefix });
    return profilePrefixStorageObject[this._storageNames.profilePrefix];
  }

  async saveProfilePrefix(prefix) {
    await browser.storage.local.set({ [this._storageNames.profilePrefix]: prefix });
  }

  async getProfilePrefixSeparator() {
    const profileObject = await browser.storage.local
      .get({ [this._storageNames.profilePrefixSeparator]: DefaultValues.profilePrefixSeparator });
    return profileObject[this._storageNames.profilePrefixSeparator];
  }

  async saveProfilePrefixSeparator(profilePrefixSeparator) {
    await browser.storage.local
      .set({ [this._storageNames.profilePrefixSeparator]: profilePrefixSeparator });
  }

  async getUserWindowTitle(windowId) {
    return await browser.sessions.getWindowValue(windowId, this._storageNames.userWindowTitle) || '';
  }

  async saveUserWindowTitle(currentWindowId, userWindowTitle) {
    await browser.sessions
      .setWindowValue(currentWindowId, this._storageNames.userWindowTitle, userWindowTitle);
  }
}
