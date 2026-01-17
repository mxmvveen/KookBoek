import { getRecipies } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/elements/breadcrumbs/breadcrumbs";
import Heading from "@/app/ui/elements/heading/heading";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Typography, Rating, Chip } from "@mui/material";
import Image from "next/image";
import "../page.scss";
import { Breadcrumb, Recipe } from "@/app/lib/definitions";
import PreparationCard from "@/app/ui/elements/recipe/preparation-card";
import { RecipeParams } from "../page";
import { UrlUtils } from "@/app/lib/urlUtils";
import RecipeInstructions from "@/app/ui/elements/recipe/recipe-instructions";

const RecipePage = async ({ params }: { params: RecipeParams }) => {
  const { id } = await params;
  const recipes: Recipe[] = await getRecipies();
  const recipe: Recipe | undefined = recipes.find((value) => {
    return value.id === id;
  });

  if (!recipe) {
    return null;
  }

  const breadcrumbs: Breadcrumb[] = [
    { label: "home", url: "/" },
    {
      label: recipe.category.label,
      url: UrlUtils.getCategoryUrl(recipe.category),
    },
    {
      label: recipe.title,
      url: UrlUtils.getRecipeUrl(recipe),
    },
  ];

  return (
    <div className="container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Card className="mt-6 flex">
        <CardContent className="w-130">
          <div className="pl-5 pt-2">
            <Typography gutterBottom variant="h4" component="h1">
              {recipe.title}
            </Typography>
            <div className="mt-3">
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {recipe.description}
              </Typography>
            </div>
            <div className="flex mt-6">
              <Rating
                className="mr-4"
                name="size-small"
                readOnly
                value={recipe.rate}
                size="small"
              />
              <div className="mr-4">
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <FontAwesomeIcon className="mr-1" icon={faClock} />
                  {recipe.time} min
                </Typography>
              </div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <FontAwesomeIcon className="mr-1" icon={faUser} />
                {recipe.portions}
              </Typography>
            </div>

            <div className="mt-15">
              {recipe.tags.map((tag, key) => (
                <Chip
                  key={key}
                  label={tag}
                  variant="outlined"
                  className="mr-2"
                />
              ))}
            </div>
          </div>
        </CardContent>
        <Image
          src={recipe.image}
          width={470}
          height={390}
          alt=""
          className="ml-auto rounded-sm"
          style={{ width: "470px", height: "390px", objectFit: "cover" }}
        />
      </Card>

      <Heading>Bereiding</Heading>
      <Card className="mt-6 flex">
        <CardContent className="flex">
          <PreparationCard
            ingredients={recipe.preparation.ingredients}
            numberOfPortions={recipe.portions}
          />
          <div>
            <div className="mb-1 mt-2 ml-12.5">
              <Typography variant="h6" component="h3">
                Instructies
              </Typography>
            </div>
            <RecipeInstructions steps={recipe.preparation.steps} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipePage;
