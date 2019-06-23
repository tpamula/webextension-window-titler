export default class FullWindowTitleComputer {
  computeFullWindowTitle(profileTitle, profileTitleSeparator, userWindowTitle,
    fullWindowTitleOpeningTag, fullWindowTitleClosingTag) {
    const titleExists = profileTitle || userWindowTitle;
    if (!titleExists) {
      return '';
    }

    const isSeparatorRequired = profileTitle && userWindowTitle;
    const separator = isSeparatorRequired
      ? profileTitleSeparator
      : '';

    const fullWindowTitle = `${fullWindowTitleOpeningTag}${profileTitle}${separator}${userWindowTitle}${fullWindowTitleClosingTag}`;
    return fullWindowTitle;
  }
}
