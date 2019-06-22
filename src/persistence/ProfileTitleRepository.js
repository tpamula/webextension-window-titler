import DefaultValues from '/src/model/DefaultValues.js';
import StorageInputValidator from './StorageInputValidator.js';

const localStorageProfileNames = {
  profileTitle: 'profileTitle',
  profileTitleSeparator: 'profileTitleSeparator'
};

export default class ProfileTitleRepository {
  constructor() {
    this._storageinputValidator = new StorageInputValidator();
  }

  async getProfileTitle() {
    const profileTitleStorageObject = await browser.storage.local
      .get({ [localStorageProfileNames.profileTitle]: DefaultValues.profileTitle });
    return profileTitleStorageObject[localStorageProfileNames.profileTitle];
  }

  async saveProfileTitle(profileTitle) {
    this._storageinputValidator.validate(profileTitle);

    await browser.storage.local.set({ [localStorageProfileNames.profileTitle]: profileTitle });
  }

  async getProfileTitleSeparator() {
    const profileObject = await browser.storage.local.get({
      [localStorageProfileNames.profileTitleSeparator]: DefaultValues.profileTitleSeparator,
    });
    return profileObject[localStorageProfileNames.profileTitleSeparator];
  }

  async saveProfileTitleSeparator(profileTitleSeparator) {
    this._storageinputValidator.validate(profileTitleSeparator);

    await browser.storage.local
      .set({ [localStorageProfileNames.profileTitleSeparator]: profileTitleSeparator });
  }
}
