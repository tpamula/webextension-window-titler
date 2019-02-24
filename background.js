function restoreWindowTitles() {
  browser.windows.getAll((windows) => {
    windows.map(window => window.id).forEach((windowId) => {
      browser.sessions.getWindowValue(windowId, 'title').then((title) => {
        if (title) browser.windows.update(windowId, { titlePreface: title });
      });
    });
  });
}

// Needs to listen in case the user restores windows by clicking the restore button in the session
// manager window.
// http://kb.mozillazine.org/Browser.sessionstore.max_resumed_crashes
//
// There doesn't seem to be an appropriate event firing after the session is restored so resorting
// to this one instead.
browser.tabs.onCreated.addListener(() => {
  restoreWindowTitles();
});

// Needs to run if the session is restored automatically, without the session manager window.
restoreWindowTitles();
