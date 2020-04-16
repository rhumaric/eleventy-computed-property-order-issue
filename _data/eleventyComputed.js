const defaultLocale = 'en';
const supportedLocales = [defaultLocale, 'fr'];
const supportedLocalesExtensionRegExp = `\\.(${supportedLocales.join('|')})$`

function withoutLocaleExtension(path = '') {
  return path.replace(new RegExp(supportedLocalesExtensionRegExp), '');
}

module.exports = {
  // Grab the locale from the file extension
  // TODO: From a starting folder too
  locale(data) {
    console.log('grabbing locale');
    if (data.page.inputPath) {
      const parts = new RegExp(`.*${supportedLocalesExtensionRegExp}`).exec(data.page.fileSlug);
      if (parts) {
        return parts[1];
      } else {
        return defaultLocale;
      }
    }
  },
  // Add a 'key' to match translated content
  key(data) {
    if (data.locale) {
      const key = withoutLocaleExtension(data.page.fileSlug);
      console.log('Setting key', key);
      return key;
    }
  },
  // Generate a permalink based on the locale
  permalink(data) {
    console.log('generating permalink');
    if (data.locale) {
      if (data.locale !== defaultLocale) {
        // Use either the permalink or the key (not the fileSlug)
        console.log('pl', data.permalink);
        console.log('key', data.key);
        return `${data.locale}/${data.permalink || data.key}/`;
      } else {
        // TODO: Remove '/<locale>/' prefix for default extension
        return data.permalink;
      }
    }
    return data.permalink;
  }
}
