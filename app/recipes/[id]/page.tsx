import { getRecipies } from "@/app/lib/data";
import "./page.scss";
import { Recipe } from "@/app/lib/definitions";
import { redirect, RedirectType } from "next/navigation";
import { UrlUtils } from "@/app/lib/urlUtils";

export interface RecipeParams {
  id: string;
  name?: string;
}

const RecipePageWrapper = async ({ params }: { params: RecipeParams }) => {
  const { id } = await params;
  const recipes: Recipe[] = await getRecipies();
  const recipe: Recipe | undefined = recipes.find((value) => {
    return value.id === id;
  });

  if (!recipe) {
    return null;
  }

  redirect(
    `/recipes/${recipe.id}/${UrlUtils.getUrlFriendlyLabel(recipe.title)}`,
    RedirectType.replace
  );

  return <></>;
};

export default RecipePageWrapper;
