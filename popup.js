class WindowTitleManager {
	async rename(title) {
		let computedTitle = title ? `[${title}] ` : '';
		
		let currentWindow = await window.browser.windows.getCurrent();
		browser.windows.update(currentWindow.id, { titlePreface: computedTitle })
			.then(createNotification(computedTitle));
	}
}

function createNotification(prefix){
	browser.notifications.create({
		"type": "basic",
		"title": `This window prefix is now: ${prefix}`,
		"message": "If you want to disable notifications go to -> ..."
	  });
}

document.getElementById("window-title-prefix-form").addEventListener("submit", (e) => {
	let title = document.getElementById("title-input").value;

	new WindowTitleManager().rename(title);

	e.preventDefault();
});