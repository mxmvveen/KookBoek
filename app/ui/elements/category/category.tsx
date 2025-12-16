import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Heading from "../heading/heading";
import CategoryRow from "./category-row";
import { getRecipies } from "@/app/lib/data";
import RecipeCard from "../RecipeCard/recipe-card";
import { JSX } from "react";

const ARRAY_SIZE = 4;

const chunkArray = <T,>(array: T[], size: number): Array<T[]> => {
  const chunks: Array<T[]> = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, size + i));
  }
  return chunks;
};

interface CategoryProps {
  isHomePage?: boolean;
}

const Category: React.FC<CategoryProps> = async ({ isHomePage }) => {
  const category = await getRecipies();
  const elements: Array<Recipe[]> = chunkArray(category, ARRAY_SIZE);

  const moreButton: JSX.Element = (
    <div className="ml-auto pt-7.5">
      <Button>
        Alle lunches
        <FontAwesomeIcon className="icon" icon={faChevronRight} />
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex">
        <Heading>Lunches</Heading>
        {isHomePage && moreButton}
      </div>
      {elements.map((items, key) => {
        if (isHomePage && key > 0) {
          return null;
        }
        return (
          <div
            className="flex flex-no-wrap -ml-2 -mr-2 flex-wrap mb-8"
            key={key}
          >
            {items.map((item, key) => (
              <RecipeCard key={key} />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Category;
