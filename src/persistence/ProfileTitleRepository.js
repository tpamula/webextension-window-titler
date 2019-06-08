import DefaultValues from '/src/model/DefaultValues.js';
import StorageInputValidator from './StorageInputValidator.js';

const localStorageNames = {
  profileTitle: 'profileTitle',
  profileTitleSeparator: 'profileTitleSeparator',
};

export default class ProfileTitleRepository {
  constructor() {
    this._storageinputValidator = new StorageInputValidator();
  }

  async getProfileTitle() {
    const profileTitleStorageObject = await browser.storage.local
      .get({ [localStorageNames.profileTitle]: DefaultValues.profileTitle });
    return profileTitleStorageObject[localStorageNames.profileTitle];
  }

  async saveProfileTitle(profileTitle) {
    this._storageinputValidator.validate(profileTitle);

    await browser.storage.local.set({ [localStorageNames.profileTitle]: profileTitle });
  }

  async getProfileTitleSeparator() {
    const profileObject = await browser.storage.local.get({
      [localStorageNames.profileTitleSeparator]: DefaultValues.profileTitleSeparator,
    });
    return profileObject[localStorageNames.profileTitleSeparator];
  }

  async saveProfileTitleSeparator(profileTitleSeparator) {
    this._storageinputValidator.validate(profileTitleSeparator);

    await browser.storage.local
      .set({ [localStorageNames.profileTitleSeparator]: profileTitleSeparator });
  }
}
