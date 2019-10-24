import WindowTitler from '/src/WindowTitler.js';
import ProfileTitleDao from '/src/persistence/ProfileTitleDao.js';
import FullWindowTitleTagDao from '/src/persistence/FullWindowTitleTagDao.js';
import DefaultValues from '/src/model/DefaultValues.js';

const windowTitler = new WindowTitler();
const profileTitleDao = new ProfileTitleDao();
const titleTags = new FullWindowTitleTagDao();


// Profile Functions
function setProfileOptions(profileTitle, profileTitleSeparator) {
  document.querySelector('#profile-title').value = profileTitle;
  document.querySelector('#profile-title-separator').value = profileTitleSeparator;
}

async function restoreProfileOptions() {
  const profileTitle = await profileTitleDao.getProfileTitle();
  const profileTitleSeparator = await profileTitleDao.getProfileTitleSeparator();

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

// Tag Functions
function setFullWindowTitleTagOptions(openingTag, closingTag) {
  document.querySelector('#opening-tag').value = openingTag;
  document.querySelector('#closing-tag').value = closingTag;
}

async function restoreFullWindowTitleTagOptions() {
  const openingTag = await titleTags.getOpeningTag();
  const closingTag = await titleTags.getClosingTag();

  setFullWindowTitleTagOptions(openingTag, closingTag);
}

function saveFullWindowTitleTagOptions() {
  const openingTag = document.querySelector('#opening-tag').value;
  const closingTag = document.querySelector('#closing-tag').value;
  windowTitler.saveFullWindowTitleTagsAndRefreshPresentation(openingTag, closingTag);
}

function restoreFullWindowTitleTagDefaults() {
  setFullWindowTitleTagOptions(DefaultValues.fullWindowTitleOpeningTag,
    DefaultValues.fullWindowTitleClosingTag);
}

// Profile Actions
restoreProfileOptions();
document.querySelector('#save-profile').addEventListener('click', saveProfileOptions);
document.querySelector('#restore-profile-defaults').addEventListener('click', restoreProfileDefaults);

// Tag Actions
restoreFullWindowTitleTagOptions();
document.querySelector('#save-tags').addEventListener('click', saveFullWindowTitleTagOptions);
document.querySelector('#restore-tag-defaults').addEventListener('click', restoreFullWindowTitleTagDefaults);
