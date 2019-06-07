import PersistenceManager from './PersistenceManager.js';
import TitleComputer from './TitleComputer.js';

export default class WindowTitler {
  constructor() {
    this._titleComputer = new TitleComputer();
    this._persistenceManager = new PersistenceManager();
  }

  async saveProfilePrefixAndRefreshPresentation(profilePrefix, profilePrefixSeparator = null) {
    await this._persistenceManager.saveProfilePrefix(profilePrefix);
    if (profilePrefixSeparator !== null) {
      await this._persistenceManager.saveProfilePrefixSeparator(profilePrefixSeparator);
    }
    await this._refreshPresentationForAllWindows();
  }

  async saveUserWindowTitleAndRefreshPresentation(windowId, userWindowTitle) {
    await this._persistenceManager.saveUserWindowTitle(windowId, userWindowTitle);
    await this._refreshPresentationForWindow(windowId);
  }

  async _refreshPresentationForAllWindows() {
    await browser.windows.getAll((windows) => {
      windows.map(window => window.id)
        .forEach(windowId => this._refreshPresentationForWindow(windowId));
    });
  }

  async _refreshPresentationForWindow(windowId) {
    const profilePrefix = await this._persistenceManager.getProfilePrefix();
    const profilePrefixSeparator = await this._persistenceManager.getProfilePrefixSeparator();
    const userWindowTitle = await this._persistenceManager.getUserWindowTitle(windowId);
    const fullWindowTitle = await this._titleComputer
      .computeFullWindowTitle(profilePrefix, profilePrefixSeparator, userWindowTitle);

    await browser.windows.update(windowId, { titlePreface: fullWindowTitle });
  }
}
