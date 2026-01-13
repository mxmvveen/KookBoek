import { UrlUtils } from "@/app/lib/urlUtils";

describe("UrlUtils", () => {
  describe("getUrlFriendlyLabel", () => {
    it("replaces single spaces with dashes", () => {
      expect(UrlUtils.getUrlFriendlyLabel("hello world")).toBe("hello-world");
    });

    it("replaces multiple consecutive spaces with a single dash", () => {
      expect(UrlUtils.getUrlFriendlyLabel("hello   world")).toBe("hello-world");
    });

    it("replaces tabs and newlines with dashes", () => {
      expect(UrlUtils.getUrlFriendlyLabel("hello\tworld\nagain")).toBe(
        "hello-world-again"
      );
    });

    it("returns the same string if there are no spaces", () => {
      expect(UrlUtils.getUrlFriendlyLabel("helloworld")).toBe("helloworld");
    });

    it("handles leading and trailing spaces", () => {
      expect(UrlUtils.getUrlFriendlyLabel("  hello world  ")).toBe(
        "-hello-world-"
      );
    });
  });
});
