async function setTitle(title) {
  const currentWindow = await window.browser.windows.getCurrent();

  await browser.sessions.setWindowValue(currentWindow.id, 'title', title);

  return setWindowTitle(currentWindow.id);
}

document.getElementById('window-title-prefix-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title-input').value;
  await setTitle(title);

  window.close();
});
