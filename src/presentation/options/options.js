import WindowTitler from '/src/WindowTitler.js';
import ProfileTitleRepository from '/src/persistence/ProfileTitleRepository.js';
import TitleTagsRepository from '/src/persistence/TitleTagsRepository.js';
import DefaultValues from '/src/model/DefaultValues.js';

const windowTitler = new WindowTitler();
const profileTitleRepository = new ProfileTitleRepository();
const titleTags = new TitleTagsRepository();


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
function setTitleTagOptions(openingTag, closingTag) {
  document.querySelector('#opening-tag').value = openingTag;
  document.querySelector('#closing-tag').value = closingTag;
}

async function restoreTitleTagOptions() {
  const openingTag = await titleTags.getOpeningTag();
  const closingTag = await titleTags.getClosingTag();

  setTitleTagOptions(openingTag, closingTag);
}

function saveTitleTagOptions() {
  const openingTag = document.querySelector('#opening-tag').value;
  const closingTag = document.querySelector('#closing-tag').value;
  windowTitler.saveTitleTagsAndRefreshPresentation(openingTag, closingTag);
}

function restoreTitleTagDefaults() {
  setTitleTagOptions(DefaultValues.openingTag, DefaultValues.closingTag);
}


// Tags Actions
restoreTitleTagOptions();
document.querySelector('#save-tags').addEventListener('click', saveTitleTagOptions);
document.querySelector('#restore-tags-defaults').addEventListener('click', restoreTitleTagDefaults);