import DefaultValues from '/src/model/DefaultValues.js';
import StorageInputValidator from './StorageInputValidator.js';

const localStorageTagNames = {
    openingTag: 'openingTag',
    closingTag: 'closingTag'
};

export default class TitleTagsRepository {
    constructor() {
      this._storageInputValidator = new StorageInputValidator();
    }
  
    async getOpeningTag() {
      const localStorageTagNameObject = await browser.storage.local
        .get({ [localStorageTagNames.openingTag]: DefaultValues.openingTag });
      return localStorageTagNameObject[localStorageTagNames.openingTag];
    }
  
    async saveOpeningTag(openingTag) {
      this._storageInputValidator.validate(openingTag);
  
      await browser.storage.local.set({ [localStorageTagNames.openingTag]: openingTag });
    }
  
    async getClosingTag() {
      const localStorageTagNameObject = await browser.storage.local
        .get({ [localStorageTagNames.closingTag]: DefaultValues.closingTag });
      return localStorageTagNameObject[localStorageTagNames.closingTag];
    }
  
    async saveClosingTag(closingTag) {
      this._storageInputValidator.validate(closingTag);
  
      await browser.storage.local.set({ [localStorageTagNames.closingTag]: closingTag });
    }
}