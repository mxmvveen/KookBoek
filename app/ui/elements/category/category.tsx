import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Heading from "../heading/heading";
import { getRecipies } from "@/app/lib/data";
import RecipeCard from "../RecipeCard/recipe-card";
import { JSX } from "react";

const ARRAY_SIZE = 4;

/**
 * Divide array into chunks.
 * @param array
 * @param size
 * @returns
 */
const chunkArray = <T,>(array: T[], size: number): Array<T[]> => {
  const chunks: Array<T[]> = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, size + i));
  }
  return chunks;
};

interface CategoryProps {
  isHomePage?: boolean;
  category: SupabaseCategory;
}

const Category: React.FC<CategoryProps> = async ({ isHomePage, category }) => {
  const recipes = (await getRecipies()).filter(
    (value) => value.category?.id === category.id
  );
  const elements: Array<Recipe[]> = chunkArray(recipes, ARRAY_SIZE);

  const moreButton: JSX.Element = (
    <div className="ml-auto pt-7.5">
      <Button>
        Alle {category.label_plural}
        <FontAwesomeIcon className="icon" icon={faChevronRight} />
      </Button>
    </div>
  );

  return (
    <>
      {elements.length > 0 && (
        <div className="flex">
          <Heading>{category.label}</Heading>
          {isHomePage && moreButton}
        </div>
      )}

      {elements.map((recipes, key) => {
        if (isHomePage && key > 0) {
          return null;
        }
        return (
          <div
            className="flex flex-no-wrap -ml-2 -mr-2 flex-wrap mb-8"
            key={key}
          >
            {recipes.map((recipe, key) => (
              <RecipeCard recipe={recipe} key={key} />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Category;
