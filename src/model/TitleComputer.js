export default class TitleComputer {
  computeFullWindowTitle(profilePrefix, profilePrefixSeparator, userWindowTitle) {
    const titleExists = profilePrefix || userWindowTitle;
    if (!titleExists) {
      return '';
    }

    const separator = (profilePrefix && userWindowTitle)
      ? profilePrefixSeparator
      : '';

    const titleWithPrefix = `${profilePrefix}${separator}${userWindowTitle}`;
    const titleWithOpeningClosingTags = `[${titleWithPrefix}]`;
    const fullWindowTitle = `${titleWithOpeningClosingTags} `;

    return fullWindowTitle;
  }
}
