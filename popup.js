function setTitle(title) {
  const computedTitle = title ? `[${title}] ` : '';

  return window.browser.windows.getCurrent().then(currentWindow => Promise.all([
    browser.windows.update(currentWindow.id, { titlePreface: computedTitle }),
    browser.sessions.setWindowValue(currentWindow.id, 'title', computedTitle)]));
}

document.getElementById('window-title-prefix-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title-input').value;
  await setTitle(title);

  window.close();
});
