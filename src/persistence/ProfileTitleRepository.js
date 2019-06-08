import DefaultValues from '../model/DefaultValues.js';

const localStorageNames = {
  profileTitle: 'profileTitle',
  profileTitleSeparator: 'profileTitleSeparator',
};

export default class ProfileTitleRepository {
  async getProfileTitle() {
    const profileTitleStorageObject = await browser.storage.local
      .get({ [localStorageNames.profileTitle]: DefaultValues.profileTitle });
    return profileTitleStorageObject[localStorageNames.profileTitle];
  }

  async saveProfileTitle(profileTitle) {
    await browser.storage.local.set({ [localStorageNames.profileTitle]: profileTitle });
  }

  async getProfileTitleSeparator() {
    const profileObject = await browser.storage.local.get({
      [localStorageNames.profileTitleSeparator]: DefaultValues.profileTitleSeparator,
    });
    return profileObject[localStorageNames.profileTitleSeparator];
  }

  async saveProfileTitleSeparator(profileTitleSeparator) {
    await browser.storage.local
      .set({ [localStorageNames.profileTitleSeparator]: profileTitleSeparator });
  }
}
