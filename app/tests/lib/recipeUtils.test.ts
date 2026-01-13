import { Ingredient } from "@/app/lib/definitions";
import { RecipeUtils } from "@/app/lib/recipeUtils";

describe("RecipeUtils", () => {
  describe("calculateIngredients", () => {
    const ingredients: Ingredient[] = [
      { label: "Bloem", amount: "200 gram" },
      { label: "Suiker", amount: "100 gram" },
      { label: "Melk", amount: "333 ml" }, // fractional
    ];

    it("returns the same amounts when portions equal numberOfPortions", () => {
      const result = RecipeUtils.calculateIngredients(ingredients, 2, 2);

      expect(result).toEqual([
        { label: "Bloem", amount: "200 gram" },
        { label: "Suiker", amount: "100 gram" },
        { label: "Melk", amount: "333 ml" },
      ]);
    });

    it("scales ingredients correctly when portions increase", () => {
      // double portions
      const result = RecipeUtils.calculateIngredients(ingredients, 4, 2);

      expect(result).toEqual([
        { label: "Bloem", amount: "400 gram" },
        { label: "Suiker", amount: "200 gram" },
        { label: "Melk", amount: "666 ml" }, // 333*2=666 → rounded 666
      ]);
    });

    it("scales ingredients correctly when portions decrease", () => {
      // half portions
      const result = RecipeUtils.calculateIngredients(ingredients, 1, 2);

      expect(result).toEqual([
        { label: "Bloem", amount: "100 gram" },
        { label: "Suiker", amount: "50 gram" },
        { label: "Melk", amount: "167 ml" }, // 333/2=166.5 → rounded 167
      ]);
    });

    it("handles non-integer portions correctly", () => {
      const result = RecipeUtils.calculateIngredients(ingredients, 3, 2);

      expect(result).toEqual([
        { label: "Bloem", amount: "300 gram" },
        { label: "Suiker", amount: "150 gram" },
        { label: "Melk", amount: "500 ml" }, // 333*1.5=499.5 → rounded 500
      ]);
    });

    it("handles ingredients with multi-word units", () => {
      const complexIngredients: Ingredient[] = [
        { label: "Olijfolie", amount: "50 ml extra virgin" },
      ];

      const result = RecipeUtils.calculateIngredients(complexIngredients, 2, 1);

      expect(result).toEqual([
        { label: "Olijfolie", amount: "100 ml extra virgin" },
      ]);
    });
  });
});
