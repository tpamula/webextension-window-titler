function computeTitle(title) {
  const getting = browser.storage.sync.get({
    prefix: '',
    prefixGlue: '',
  });

  return getting.then((result) => {
    const computedTitle = result.prefix
      + (result.prefix && title && result.prefixGlue)
      + (title || '');

    return computedTitle ? `[${computedTitle}] ` : '';
  });
}

function setWindowTitle(windowId) {
  return browser.sessions.getWindowValue(windowId, 'title')
    .catch(() => '')
    .then(title => computeTitle(title))
    .then(computedTitle => browser.windows.update(windowId, { titlePreface: computedTitle }));
}

function restoreWindowTitles() {
  return browser.windows.getAll((windows) => {
    windows.map(window => window.id)
      .forEach(setWindowTitle);
  });
}
