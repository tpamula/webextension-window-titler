import WindowTitleRepository from '/src/persistence/UserWindowTitleRepository.js';
import ProfileTitleRepository from '/src/persistence/ProfileTitleRepository.js';
import FullWindowTitleComputer from '/src/model/FullWindowTitleComputer.js';
import FullWindowTitleTagRepository from '/src/persistence/FullWindowTitleTagRepository.js';

export default class WindowTitler {
  constructor() {
    this._titleComputer = new FullWindowTitleComputer();
    this._windowTitleRepository = new WindowTitleRepository();
    this._profileTitleRepository = new ProfileTitleRepository();
    this._fullWindowTitleTagRepository = new FullWindowTitleTagRepository();
  }

  async saveProfileTitleAndRefreshPresentation(profileTitle, profileTitleSeparator = null) {
    await this._profileTitleRepository.saveProfileTitle(profileTitle);
    if (profileTitleSeparator !== null) {
      await this._profileTitleRepository.saveProfileTitleSeparator(profileTitleSeparator);
    }
    await this.refreshPresentationForAllWindows();
  }

  async saveFullWindowTitleTagsAndRefreshPresentation(openingTag, closingTag) {
    await this._fullWindowTitleTagRepository.saveOpeningTag(openingTag);
    await this._fullWindowTitleTagRepository.saveClosingTag(closingTag);
    await this.refreshPresentationForAllWindows();
  }

  async saveUserWindowTitleAndRefreshPresentation(windowId, userWindowTitle) {
    await this._windowTitleRepository.saveUserWindowTitle(windowId, userWindowTitle);
    await this._refreshPresentationForWindow(windowId);
  }

  async refreshPresentationForAllWindows() {
    await browser.windows.getAll((windows) => {
      windows.map(window => window.id)
        .forEach(windowId => this._refreshPresentationForWindow(windowId));
    });
  }

  async getUserWindowTitle(windowId) {
    const userWindowTitle = await this._windowTitleRepository.getUserWindowTitle(windowId);
    return userWindowTitle;
  }

  async _refreshPresentationForWindow(windowId) {
    const profileTitle = await this._profileTitleRepository.getProfileTitle();
    const profileTitleSeparator = await this._profileTitleRepository.getProfileTitleSeparator();
    const fullWindowTitleOpeningTag = await this._fullWindowTitleTagRepository.getOpeningTag();
    const fullWindowTitleClosingTag = await this._fullWindowTitleTagRepository.getClosingTag();
    const userWindowTitle = await this._windowTitleRepository.getUserWindowTitle(windowId);
    const fullWindowTitle = await this._titleComputer.computeFullWindowTitle(profileTitle,
      profileTitleSeparator, userWindowTitle, fullWindowTitleOpeningTag, fullWindowTitleClosingTag);

    await browser.windows.update(windowId, { titlePreface: fullWindowTitle });
  }
}
