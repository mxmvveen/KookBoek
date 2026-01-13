import { Ingredient } from "./definitions";

export class RecipeUtils {
  /**
   * Calculated the amounts of the ingredients when the number of portions are changed.
   */
  static calculateIngredients = (
    ingredients: Ingredient[],
    portions: number,
    numberOfPortions: number
  ): Ingredient[] =>
    ingredients.map((value) => {
      const percentage = portions / numberOfPortions;
      const [amount, ...unit] = value.amount.split(" ");
      const portionAmount = Number(amount) * percentage;
      const unitLabel = unit.join(" ");

      return {
        ...value,
        amount: `${Math.round(portionAmount)} ${unitLabel}`,
      };
    });
}
