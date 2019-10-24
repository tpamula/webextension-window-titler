import DefaultValues from '/src/model/DefaultValues.js';
import StorageInputValidator from './StorageInputValidator.js';

const localStorageFullWindowTitleTagNames = {
  openingTag: 'fullWindowTitleOpeningTag',
  closingTag: 'fullWindowTitleClosingTag',
};

export default class FullWindowTitleTagDao {
  constructor() {
    this._storageInputValidator = new StorageInputValidator();
  }

  async getOpeningTag() {
    const openingTagLocalStorageObject = await browser.storage.local.get({
      [localStorageFullWindowTitleTagNames.openingTag]: DefaultValues.fullWindowTitleOpeningTag,
    });
    return openingTagLocalStorageObject[localStorageFullWindowTitleTagNames.openingTag];
  }

  async saveOpeningTag(openingTag) {
    this._storageInputValidator.validate(openingTag);

    await browser.storage.local.set({
      [localStorageFullWindowTitleTagNames.openingTag]: openingTag,
    });
  }

  async getClosingTag() {
    const openingTagLocalStorageObject = await browser.storage.local.get({
      [localStorageFullWindowTitleTagNames.closingTag]: DefaultValues.fullWindowTitleClosingTag,
    });
    return openingTagLocalStorageObject[localStorageFullWindowTitleTagNames.closingTag];
  }

  async saveClosingTag(closingTag) {
    this._storageInputValidator.validate(closingTag);

    await browser.storage.local.set({
      [localStorageFullWindowTitleTagNames.closingTag]: closingTag,
    });
  }
}
