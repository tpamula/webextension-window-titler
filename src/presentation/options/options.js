import WindowTitler from '/src/WindowTitler.js';
import ProfileTitleRepository from '/src/persistence/ProfileTitleRepository.js';
import DefaultValues from '/src/model/DefaultValues.js';
import UserWindowTitleRepository from '/src/persistence/UserWindowTitleRepository.js';

const windowTitler = new WindowTitler();
const profileTitleRepository = new ProfileTitleRepository();
const UserWindowTitleRepository = new UserWindowTitleRepository();


// Profile Functions
function setProfileOptions(profileTitle, profileTitleSeparator) {
  document.querySelector('#profile-title').value = profileTitle;
  document.querySelector('#profile-title-separator').value = profileTitleSeparator;
}

async function restoreProfileOptions() {
  const profileTitle = await profileTitleRepository.getProfileTitle();
  const profileTitleSeparator = await profileTitleRepository.getProfileTitleSeparator();

  setProfileOptions(profileTitle, profileTitleSeparator);
}

function saveProfileOptions(e) {
  const profileTitle = document.querySelector('#profile-title').value;
  const profileTitleSeparator = document.querySelector('#profile-title-separator').value;

  windowTitler.saveProfileTitleAndRefreshPresentation(profileTitle, profileTitleSeparator);
}

function restoreProfileDefaults() {
  setProfileOptions(DefaultValues.profileTitle, DefaultValues.profileTitleSeparator);
}

// Profile Actions
restoreProfileOptions();
document.querySelector('#save-profile').addEventListener('click', saveProfileOptions);
document.querySelector('#restore-profile-defaults').addEventListener('click', restoreProfileDefaults);


// Tags Functions
function setWindowTitleTagsOptions(windowTitleOpeningTag, windowTitleClosingTag) {
  document.querySelector('#window-title-opening-tag').value = windowTitleOpeningTag;
  document.querySelector('#window-title-closing-tag').value = windowTitleClosingTag;
}

async function restoreWindowTitleTagsOptions() {
  const windowTitleOpeningTag = await UserWindowTitleRepository.getWindowTitleOpeningTag();
  const windowTitleClosingTag = await UserWindowTitleRepository.getWindowTitleClosingTag();

  setWindowTitleTagsOptions(windowTitleOpeningTag, windowTitleClosingTag);
}

function saveWindowTitleTagsOptions(e) {
  const windowTitleOpeningTag = document.querySelector('#window-title-opening-tag').value;
  const windowTitleClosingTag = document.querySelector('#window-title-closing-tag').value;

  windowTitler.saveWindowTitleTagsAndRefreshPresentation(windowTitleOpeningTag, windowTitleClosingTag);
}

function restoreWindowTitleTagsDefaults() {
  setProfileOptions(DefaultValues.profileTitle, DefaultValues.profileTitleSeparator);
}

// Tags Actions
restoreWindowTitleTagsOptions();
document.querySelector('#save-tags').addEventListener('click', saveWindowTitleTagsOptions);
document.querySelector('#restore-tags-defaults').addEventListener('click', restoreWindowTitleTagsDefaults);
