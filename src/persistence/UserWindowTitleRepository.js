import StorageInputValidator from './StorageInputValidator.js';

const sessionStorageNames = {
  userWindowTitle: 'userWindowTitle'
};

class UserWindowTitleRepository {
  constructor() {
    this._storageInputValidator = new StorageInputValidator();
  }

  async getUserWindowTitle(windowId) {
    const userWindowTitle = await browser.sessions
      .getWindowValue(windowId, sessionStorageNames.userWindowTitle);

    const defaultValue = '';
    return userWindowTitle || defaultValue;
  }

  async saveUserWindowTitle(currentWindowId, userWindowTitle) {
    this._storageInputValidator.validate(userWindowTitle);

    await browser.sessions
      .setWindowValue(currentWindowId, sessionStorageNames.userWindowTitle, userWindowTitle);
  }
}

// eslint-disable-next-line camelcase
class FromV1_2_1SessionStorageMigrator {
  constructor() {
    this._legacySessionStorageNames = {
      fullWindowTitle: 'title',
    };
  }

  async migrateWindowTitleToNewStorageFormat(windowId) {
    const fullWindowTitle = await browser.sessions
      .getWindowValue(windowId, this._legacySessionStorageNames.fullWindowTitle);
    if (!fullWindowTitle) return;

    const userWindowTitle = this._convertToUserWindowTitle(fullWindowTitle);

    await browser.sessions
      .setWindowValue(windowId, sessionStorageNames.userWindowTitle, userWindowTitle);

    await browser.sessions
      .removeWindowValue(windowId, this._legacySessionStorageNames.fullWindowTitle);
  }

  _convertToUserWindowTitle(fullWindowTitle) {
    // '[myWindowTitle] ' => 'myWindowTitle'
    return fullWindowTitle.substring(1, fullWindowTitle.length - 2);
  }
}

// eslint-disable-next-line camelcase,max-len
export default class FromV1_2_1MigratingUserWindowTitleRepository extends UserWindowTitleRepository {
  constructor() {
    super();

    this._fromV1_2_1StorageMigrator = new FromV1_2_1SessionStorageMigrator();
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
   *
   *
   *
   * *This is idempotent and totally transparent to the caller.*
   */
  async getUserWindowTitle(windowId) {
    await this._fromV1_2_1StorageMigrator.migrateWindowTitleToNewStorageFormat(windowId);

    return super.getUserWindowTitle(windowId);
  }
}
