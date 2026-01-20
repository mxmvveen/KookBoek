import { Recipe, SupabaseCategory } from "@/app/lib/definitions";
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
        "hello-world"
      );
    });
  });

  describe("getRecipeUrl", () => {
    const recipe: Recipe = {
      id: "123",
      title: "Chocolate Cake",
      rate: 3.5,
      time: 50,
      portions: 3,
      image:
        "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/club%20sandwich.webp",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus totam reprehenderit eum assumenda illo. Tempore adipisci magni eligendi sint voluptatibus.",
      category: {
        id: "2",
        label: "Hoofdgerecht",
        label_plural: "Hoofdgerechten",
      },
      tags: [],
      preparation: {
        steps: [
          "Lorem ipsum dolor sit",
          "amet consectetur adipisicing elit. Consectetur natus repellendus dolorem dolores Repudiandae sed quidem assumenda facilis odit cupiditate",
          "necessitatibus accusamus consectetur aliquam",
          "modi laborum dignissimos ipsam voluptate doloremque asperiores molestias animi voluptatem adipisci",
          "nostrum autem! Velit",
          "quidem dolor",
        ],
        ingredients: [
          {
            label: "Neque",
            amount: "300 g",
          },
          {
            label: "amet consectetur",
            amount: "200 g",
          },
          {
            label: "adipisicing elit",
            amount: "90 g",
          },
          {
            label: "doloremque",
            amount: "4",
          },
        ],
      },
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return the correct URL using the recipe id and URL-friendly title", () => {
      // Arrange: define what the mocked function should return
      jest
        .spyOn(UrlUtils, "getUrlFriendlyLabel")
        .mockReturnValue("chocolate-cake");

      // Act
      const url = UrlUtils.getRecipeUrl(recipe);

      // Assert
      expect(UrlUtils.getUrlFriendlyLabel).toHaveBeenCalledWith(
        "Chocolate Cake"
      );
      expect(url).toBe("/recipes/123/chocolate-cake");
    });

    it("should handle numeric and string IDs correctly", () => {
      jest
        .spyOn(UrlUtils, "getUrlFriendlyLabel")
        .mockReturnValue("vanilla-cake");

      const stringIdRecipe: Recipe = {
        ...recipe,
        id: "abc-123",
        title: "Vanilla Cake",
      };
      const url = UrlUtils.getRecipeUrl(stringIdRecipe);

      expect(url).toBe("/recipes/abc-123/vanilla-cake");
    });

    it("should handle titles with special characters", () => {
      jest.spyOn(UrlUtils, "getUrlFriendlyLabel").mockReturnValue("spicy-taco");

      const specialTitleRecipe: Recipe = {
        ...recipe,
        id: "555",
        title: "Spicy Taco!!!",
      };
      const url = UrlUtils.getRecipeUrl(specialTitleRecipe);

      expect(url).toBe("/recipes/555/spicy-taco");
    });
  });

  describe("getCategoryUrl", () => {
    const category: SupabaseCategory = {
      id: "2",
      label: "Hoofdgerecht",
      label_plural: "Hoofdgerechten",
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return the correct URL using the recipe id and URL-friendly title", () => {
      jest
        .spyOn(UrlUtils, "getUrlFriendlyLabel")
        .mockReturnValue("hoofdgerechten");

      // Act
      const url = UrlUtils.getCategoryUrl(category);

      expect(url).toBe("/categories/2/hoofdgerechten");
    });
  });
});
