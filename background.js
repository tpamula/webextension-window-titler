function restoreWindowTitles() {
  browser.windows.getAll((windows) => {
    windows.map(window => window.id).forEach((windowId) => {
      browser.sessions.getWindowValue(windowId, 'title')
        .then(title => browser.windows.update(windowId, { titlePreface: title }));
    });
  });
}

restoreWindowTitles();
