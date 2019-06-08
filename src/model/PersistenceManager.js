import DefaultValues from './DefaultValues.js';

const sessionStorageNames = {
  userWindowTitle: 'userWindowTitle',
};

class PersistenceManager {
  constructor() {
    this._localStorageNames = {
      profileTitle: 'profileTitle',
      profileTitleSeparator: 'profileTitleSeparator',
    };
    this._sessionStorageNames = sessionStorageNames;
  }

  async getProfileTitle() {
    const profileTitleStorageObject = await browser.storage.local
      .get({ [this._localStorageNames.profileTitle]: DefaultValues.profileTitle });
    return profileTitleStorageObject[this._localStorageNames.profileTitle];
  }

  async saveProfileTitle(profileTitle) {
    await browser.storage.local.set({ [this._localStorageNames.profileTitle]: profileTitle });
  }

  async getProfileTitleSeparator() {
    const profileObject = await browser.storage.local.get({
      [this._localStorageNames.profileTitleSeparator]: DefaultValues.profileTitleSeparator,
    });
    return profileObject[this._localStorageNames.profileTitleSeparator];
  }

  async saveProfileTitleSeparator(profileTitleSeparator) {
    await browser.storage.local
      .set({ [this._localStorageNames.profileTitleSeparator]: profileTitleSeparator });
  }

  async getUserWindowTitle(windowId) {
    const userWindowTitle = await browser.sessions
      .getWindowValue(windowId, this._sessionStorageNames.userWindowTitle);

    const defaultValue = '';
    return userWindowTitle || defaultValue;
  }

  async saveUserWindowTitle(currentWindowId, userWindowTitle) {
    await browser.sessions
      .setWindowValue(currentWindowId, this._sessionStorageNames.userWindowTitle, userWindowTitle);
  }
}

// eslint-disable-next-line camelcase
class FromV1_2_1StorageMigrator {
  constructor() {
    this._legacySessionStorageNames = {
      fullWindowTitle: 'title',
    };

    this._sessionStorageNames = sessionStorageNames;
  }

  async migrateWindowTitleToNewStorageFormat(windowId) {
    const fullWindowTitle = await browser.sessions
      .getWindowValue(windowId, this._legacySessionStorageNames.fullWindowTitle);
    if (!fullWindowTitle) return;

    const userWindowTitle = this._stripOpeningClosingTagsAndEndingSpace(fullWindowTitle);

    await browser.sessions
      .setWindowValue(windowId, this._sessionStorageNames.userWindowTitle, userWindowTitle);

    await browser.sessions
      .removeWindowValue(windowId, this._legacySessionStorageNames.fullWindowTitle);
  }

  _stripOpeningClosingTagsAndEndingSpace(fullWindowTitle) {
    // '[myWindowTitle] ' => 'myWindowTitle'
    return fullWindowTitle.substring(1, fullWindowTitle.length - 2);
  }
}

// eslint-disable-next-line camelcase
export default class FromV1_2_1MigratingPersistenceManager extends PersistenceManager {
  constructor() {
    super();

    this._fromV1_2_1StorageMigrator = new FromV1_2_1StorageMigrator();
  }

  /* Not a fancy thing to mutate the state in something aspiring to be a getter method.
   * Well, sometimes it has to be done:
   *
   * Window Titler v1.2.1 persisted the full window title (i.e. including opening, closing tab and
   * space at the end) this is not useful anymore, it needs to persist only the user window title
   * (i.e. value inputted by the user) so "[myWindowTitle] " becomes "myWindowTitle". And they're
   * stored in different places.
   *
   * Unfortunately migration cannot be done in a one go, as the browser.sessions API doesn't provide
   * a way to access and modify the state of the unrestored window values.
   *
   * What can be done instead is to migrate them to the new storage format one by one. Doing
   * it in this method increases the speed of transition - it is invoked more often when compared
   * to the matching save method and what's more the matching save method might not be invoked at
   * all.
   *
   * And maybe this functionality can be removed some time in the future when noone is using v1.2.1
   * (and below) anymore.
   */
  async getUserWindowTitle(windowId) {
    await this._fromV1_2_1StorageMigrator.migrateWindowTitleToNewStorageFormat(windowId);

    return super.getUserWindowTitle(windowId);
  }
}
