import WindowTitler from '/src/WindowTitler.js';
import ProfileTitleRepository from '/src/persistence/ProfileTitleRepository.js';
import WindowTitleTagsRepository from '/src/persistence/WindowTitleTagsRepository.js';
import DefaultValues from '/src/model/DefaultValues.js';

const windowTitler = new WindowTitler();
const profileTitleRepository = new ProfileTitleRepository();
const windowTitleTags = new WindowTitleTagsRepository();


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

function saveProfileOptions() {
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
function setWindowTitleTagOptions(openingTag, closingTag) {
  document.querySelector('#opening-tag').value = openingTag;
  document.querySelector('#closing-tag').value = closingTag;
}

async function restoreWindowTitleTagOptions() {
  const openingTag = await windowTitleTags.getOpeningTag();
  const closingTag = await windowTitleTags.getClosingTag();

  setWindowTitleTagOptions(openingTag, closingTag);
}

function saveWindowTitleTagOptions() {
  const openingTag = document.querySelector('#opening-tag').value;
  const closingTag = document.querySelector('#closing-tag').value;
  windowTitler.saveWindowTitleTagsAndRefreshPresentation(openingTag, closingTag);
}

function restoreWindowTitleTagDefaults() {
  setWindowTitleTagOptions(DefaultValues.openingTag, DefaultValues.closingTag);
}


// Tags Actions
restoreWindowTitleTagOptions();
document.querySelector('#save-tags').addEventListener('click', saveWindowTitleTagOptions);
document.querySelector('#restore-tags-defaults').addEventListener('click', restoreWindowTitleTagDefaults);