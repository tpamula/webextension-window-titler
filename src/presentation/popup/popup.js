import WindowTitler from '/src/model/WindowTitler.js';

const windowTitler = new WindowTitler();

async function setUserWindowTitle(title) {
  const currentWindow = await window.browser.windows.getCurrent();

  await windowTitler.saveUserWindowTitleAndRefreshPresentation(currentWindow.id, title);
}

document.getElementById('window-titler-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userWindowTitle = document.getElementById('user-window-title-input').value;
  await setUserWindowTitle(userWindowTitle);

  window.close();
});
