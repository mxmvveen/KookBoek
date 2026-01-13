import { getRecipies } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/elements/breadcrumbs/breadcrumbs";
import Heading from "@/app/ui/elements/heading/heading";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Typography, Rating, Chip } from "@mui/material";
import Image from "next/image";
import "./page.scss";
import { Breadcrumb, Recipe } from "@/app/lib/definitions";
import PreparationCard from "@/app/ui/elements/recipe/preparation-card";

const RecipePage = async ({ params }: { params: { id: string } }) => {
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
      url: `/categories/${recipe?.category.id}`,
    },
    {
      label: recipe.title,
      url: `/recipes/${recipe.id}`,
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
            {recipe.preparation.steps.map((step, key) => (
              <div key={key} className="flex mt-5">
                <div className="step-count">{key + 1}</div>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {step}
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipePage;
