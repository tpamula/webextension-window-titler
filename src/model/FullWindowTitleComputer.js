export default class FullWindowTitleComputer {
  computeFullWindowTitle(profileTitle, profileTitleSeparator, userWindowTitle, windowTitleOpeningTag, windowTitleClosingTag) {
    const titleExists = profileTitle || userWindowTitle;
    if (!titleExists) {
      return '';
    }

    const isSeparatorRequired = profileTitle && userWindowTitle;
    const separator = isSeparatorRequired
      ? profileTitleSeparator
      : '';

    const titleWithProfileTitle = `${profileTitle}${separator}${userWindowTitle}`;
    const titleWithOpeningClosingTags = `${(windowTitleOpeningTag == null) ? '' : windowTitleOpeningTag}${titleWithProfileTitle}${(windowTitleClosingTag == null) ? '' : windowTitleClosingTag}`;
    const fullWindowTitle = `${titleWithOpeningClosingTags} `;

    return fullWindowTitle;
  }
}
