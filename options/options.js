const DEFAULT_PREFIX = '';
const DEFAULT_PREFIX_GLUE = ' - ';

function saveOptions(e) {
  e.preventDefault();
  return browser.storage.sync.set({
    prefix: document.querySelector('#titler_prefix').value,
    prefixGlue: document.querySelector('#titler_prefix_glue').value,
  })
    .then(() => restoreWindowTitles());
}

function setCurrentChoice(result) {
  document.querySelector('#titler_prefix').value = result.prefix;
  document.querySelector('#titler_prefix_glue').value = result.prefixGlue;
}

function restoreDefaults() {
  setCurrentChoice({
    prefix: DEFAULT_PREFIX,
    prefixGlue: DEFAULT_PREFIX_GLUE,
  });
}

function restoreOptions() {
  const getting = browser.storage.sync.get({
    prefix: DEFAULT_PREFIX,
    prefixGlue: DEFAULT_PREFIX_GLUE,
  });
  return getting.then(setCurrentChoice);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
document.querySelector('#titler_defaults').addEventListener('click', restoreDefaults);
