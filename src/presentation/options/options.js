import WindowTitler from '/src/model/WindowTitler.js';
import PersistenceManager from '/src/model/PersistenceManager.js';
import DefaultValues from '/src/model/DefaultValues.js';

const windowTitler = new WindowTitler();
const persistenceManager = new PersistenceManager();

function setOptions(profileTitle, profileTitleSeparator) {
  document.querySelector('#profile-title').value = profileTitle;
  document.querySelector('#profile-title-separator').value = profileTitleSeparator;
}

async function restoreOptions() {
  const profileTitle = await persistenceManager.getProfileTitle();
  const profileTitleSeparator = await persistenceManager.getProfileTitleSeparator();

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
