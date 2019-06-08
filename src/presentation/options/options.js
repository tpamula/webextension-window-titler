import WindowTitler from '/src/WindowTitler.js';
import ProfileTitleRepository from '/src/persistence/ProfileTitleRepository.js';
import DefaultValues from '/src/model/DefaultValues.js';

const windowTitler = new WindowTitler();
const profileTitleRepository = new ProfileTitleRepository();

function setOptions(profileTitle, profileTitleSeparator) {
  document.querySelector('#profile-title').value = profileTitle;
  document.querySelector('#profile-title-separator').value = profileTitleSeparator;
}

async function restoreOptions() {
  const profileTitle = await profileTitleRepository.getProfileTitle();
  const profileTitleSeparator = await profileTitleRepository.getProfileTitleSeparator();

  setOptions(profileTitle, profileTitleSeparator);
}

function saveOptions(e) {
  e.preventDefault();

  const profileTitle = document.querySelector('#profile-title').value;
  const profileTitleSeparator = document.querySelector('#profile-title-separator').value;

  windowTitler.saveProfileTitleAndRefreshPresentation(profileTitle, profileTitleSeparator);
}

function restoreDefaults() {
  setOptions(DefaultValues.profileTitle, DefaultValues.profileTitleSeparator);
}

restoreOptions();
document.querySelector('form').addEventListener('submit', saveOptions);
document.querySelector('#restore-defaults').addEventListener('click', restoreDefaults);
