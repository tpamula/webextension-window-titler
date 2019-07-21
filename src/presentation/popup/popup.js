import WindowTitler from '/src/WindowTitler.js';
import WindowTitleRepository from '/src/persistence/UserWindowTitleRepository.js';

const windowTitler = new WindowTitler();
const windowTitleRepository = new WindowTitleRepository();

async function setUserWindowTitle(title) {
  const currentWindow = await window.browser.windows.getCurrent();

  await windowTitler.saveUserWindowTitleAndRefreshPresentation(currentWindow.id, title);
}

async function getCurrentWindowTitle() {
  const currentWindow = await window.browser.windows.getCurrent();
  const currentWindowTitle = await windowTitleRepository.getUserWindowTitle(currentWindow.id);

  return currentWindowTitle;
}

document.querySelector('#window-titler-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userWindowTitle = document.querySelector('#user-window-title-input').value;
  await setUserWindowTitle(userWindowTitle);

  window.close();
});

window.onload = async () => {
  const currentWindowTitle = await getCurrentWindowTitle();
  const userWindowTitleInput = document.querySelector('#user-window-title-input');

  userWindowTitleInput.value = currentWindowTitle;
  userWindowTitleInput.select();
};

document.querySelector('#btn-settings').onclick = () => browser.runtime.openOptionsPage();
