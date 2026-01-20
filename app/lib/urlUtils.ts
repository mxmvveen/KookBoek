import { Recipe, SupabaseCategory } from "./definitions";

export class UrlUtils {
  static getUrlFriendlyLabel = (value: string): string => {
    return value.trim().replace(/\s+/g, "-").toLowerCase();
  };

  static getRecipeUrl = (recipe: Recipe) =>
    `/recipes/${recipe.id}/${UrlUtils.getUrlFriendlyLabel(recipe.title)}`;

  static getCategoryUrl = (category: SupabaseCategory) =>
    `/categories/${category.id}/${UrlUtils.getUrlFriendlyLabel(
      category.label_plural
    )}`;
}
