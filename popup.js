class WindowTitleManager {
	async rename(title) {
		let computedTitle = title ? `[${title}] ` : '';
		
		let currentWindow = await window.browser.windows.getCurrent();
		browser.windows.update(currentWindow.id, { titlePreface: computedTitle });
			.then(window.close());
	}
}

document.getElementById("window-title-prefix-form").addEventListener("submit", (e) => {
	let title = document.getElementById("title-input").value;

	new WindowTitleManager().rename(title);

	e.preventDefault();
});
