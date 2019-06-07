import WindowTitler from '/src/model/WindowTitler.js';
import PersistenceManager from '/src/model/PersistenceManager.js';
import DefaultValues from '/src/model/DefaultValues.js';

const windowTitler = new WindowTitler();
const persistenceManager = new PersistenceManager();

function setOptions(prefix, prefixSeparator) {
  document.querySelector('#profile-prefix').value = prefix;
  document.querySelector('#profile-prefix-separator').value = prefixSeparator;
}

async function restoreOptions() {
  const prefix = await persistenceManager.getProfilePrefix();
  const prefixSeparator = await persistenceManager.getProfilePrefixSeparator();

  setOptions(prefix, prefixSeparator);
}

function saveOptions(e) {
  e.preventDefault();

  const profilePrefix = document.querySelector('#profile-prefix').value;
  const profilePrefixSeparator = document.querySelector('#profile-prefix-separator').value;

  windowTitler.saveProfilePrefixAndRefreshPresentation(profilePrefix, profilePrefixSeparator);
}

function restoreDefaults() {
  setOptions(DefaultValues.profilePrefix, DefaultValues.profilePrefixSeparator);
}

restoreOptions();
document.querySelector('form').addEventListener('submit', saveOptions);
document.querySelector('#restore-defaults').addEventListener('click', restoreDefaults);
