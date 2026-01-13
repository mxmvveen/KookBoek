export class UrlUtils {
  static getUrlFriendlyLabel = (value: string): string => {
    return value.replace(/\s+/g, "-");
  };
}
