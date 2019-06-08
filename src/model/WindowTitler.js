import PersistenceManager from './PersistenceManager.js';
import TitleComputer from './TitleComputer.js';

export default class WindowTitler {
  constructor() {
    this._titleComputer = new TitleComputer();
    this._persistenceManager = new PersistenceManager();
  }

  async saveProfileTitleAndRefreshPresentation(profileTitle, profileTitleSeparator = null) {
    await this._persistenceManager.saveProfileTitle(profileTitle);
    if (profileTitleSeparator !== null) {
      await this._persistenceManager.saveProfileTitleSeparator(profileTitleSeparator);
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
    const profileTitle = await this._persistenceManager.getProfileTitle();
    const profileTitleSeparator = await this._persistenceManager.getProfileTitleSeparator();
    const userWindowTitle = await this._persistenceManager.getUserWindowTitle(windowId);
    const fullWindowTitle = await this._titleComputer
      .computeFullWindowTitle(profileTitle, profileTitleSeparator, userWindowTitle);

    await browser.windows.update(windowId, { titlePreface: fullWindowTitle });
  }
}
