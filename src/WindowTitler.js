import WindowTitleDao from '/src/persistence/UserWindowTitleDao.js';
import ProfileTitleDao from '/src/persistence/ProfileTitleDao.js';
import FullWindowTitleComputer from '/src/model/FullWindowTitleComputer.js';
import FullWindowTitleTagDao from '/src/persistence/FullWindowTitleTagDao.js';

export default class WindowTitler {
  constructor() {
    this._titleComputer = new FullWindowTitleComputer();
    this._windowTitleDao = new WindowTitleDao();
    this._profileTitleDao = new ProfileTitleDao();
    this._fullWindowTitleTagDao = new FullWindowTitleTagDao();
  }

  async saveProfileTitleAndRefreshPresentation(profileTitle, profileTitleSeparator = null) {
    await this._profileTitleDao.saveProfileTitle(profileTitle);
    if (profileTitleSeparator !== null) {
      await this._profileTitleDao.saveProfileTitleSeparator(profileTitleSeparator);
    }
    await this.refreshPresentationForAllWindows();
  }

  async saveFullWindowTitleTagsAndRefreshPresentation(openingTag, closingTag) {
    await this._fullWindowTitleTagDao.saveOpeningTag(openingTag);
    await this._fullWindowTitleTagDao.saveClosingTag(closingTag);
    await this.refreshPresentationForAllWindows();
  }

  async saveUserWindowTitleAndRefreshPresentation(windowId, userWindowTitle) {
    await this._windowTitleDao.saveUserWindowTitle(windowId, userWindowTitle);
    await this._refreshPresentationForWindow(windowId);
  }

  async refreshPresentationForAllWindows() {
    await browser.windows.getAll((windows) => {
      windows.map(window => window.id)
        .forEach(windowId => this._refreshPresentationForWindow(windowId));
    });
  }

  async _refreshPresentationForWindow(windowId) {
    const profileTitle = await this._profileTitleDao.getProfileTitle();
    const profileTitleSeparator = await this._profileTitleDao.getProfileTitleSeparator();
    const fullWindowTitleOpeningTag = await this._fullWindowTitleTagDao.getOpeningTag();
    const fullWindowTitleClosingTag = await this._fullWindowTitleTagDao.getClosingTag();
    const userWindowTitle = await this._windowTitleDao.getUserWindowTitle(windowId);
    const fullWindowTitle = await this._titleComputer.computeFullWindowTitle(profileTitle,
      profileTitleSeparator, userWindowTitle, fullWindowTitleOpeningTag, fullWindowTitleClosingTag);

    await browser.windows.update(windowId, { titlePreface: fullWindowTitle });
  }
}
