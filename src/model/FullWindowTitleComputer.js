export default class FullWindowTitleComputer {
  computeFullWindowTitle(profileTitle, profileTitleSeparator, userWindowTitle, openingTag, closingTag) {
    const titleExists = profileTitle || userWindowTitle;
    if (!titleExists) {
      return '';
    }

    const isSeparatorRequired = profileTitle && userWindowTitle;
    const separator = isSeparatorRequired
      ? profileTitleSeparator
      : '';

    const titleWithProfileTitle = `${profileTitle}${separator}${userWindowTitle}`;
    const titleWithOpeningClosingTags = `${openingTag}${titleWithProfileTitle}${closingTag}`;
    const fullWindowTitle = `${titleWithOpeningClosingTags} `;

    return fullWindowTitle;
  }
}
