export default class TitleComputer {
  computeFullWindowTitle(profileTitle, profileTitleSeparator, userWindowTitle) {
    const titleExists = profileTitle || userWindowTitle;
    if (!titleExists) {
      return '';
    }

    const isSeparatorRequired = profileTitle && userWindowTitle;
    const separator = isSeparatorRequired
      ? profileTitleSeparator
      : '';

    const titleWithProfileTitle = `${profileTitle}${separator}${userWindowTitle}`;
    const titleWithOpeningClosingTags = `[${titleWithProfileTitle}]`;
    const fullWindowTitle = `${titleWithOpeningClosingTags} `;

    return fullWindowTitle;
  }
}
