import { Recipe, SupabaseCategory } from "./definitions";

export class UrlUtils {
  static getUrlFriendlyLabel = (value: string): string => {
    return value.trim().replace(/\s+/g, "-");
  };

  static getRecipeUrl = (recipe: Recipe) =>
    `/recipes/${recipe.id}/${UrlUtils.getUrlFriendlyLabel(recipe.title)}`;

  static getCategoryUrl = (category: SupabaseCategory) =>
    `/categories/${category.id}`;
}
