import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link } from "@mui/material";
import Heading from "../heading/heading";
import { getRecipies } from "@/app/lib/data";
import { JSX } from "react";
import CategoryPages from "./category-pages";
import "./category.scss";

interface CategoryProps {
  isHomePage?: boolean;
  category: SupabaseCategory;
}

const Category: React.FC<CategoryProps> = async ({ isHomePage, category }) => {
  // const recipes = (await getRecipies()).filter(
  //   (value) => value.category?.id === category.id
  // );
  const recipes: Recipe[] = [];

  const breadcrumbs = [
    { label: "home", url: "/" },
    { label: category.label, url: `/categories/${category.id}` },
  ];

  const showMoreButton = isHomePage && recipes.length > 4;

  const moreButton: JSX.Element = (
    <div className="ml-auto pt-7.5">
      <Button href={`categories/${category.id}`}>
        Alle {category.label_plural}
        <FontAwesomeIcon className="icon" icon={faChevronRight} />
      </Button>
    </div>
  );

  return (
    <>
      {breadcrumbs.map((breadcrumb, key, array) => (
        <span key={key} className="breadcrumbs">
          <Link href={breadcrumb.url} underline="hover" className="uppercase">
            <span className="font-semibold">{breadcrumb.label}</span>
          </Link>
          {key < array.length - 1 && (
            <span className="font-semibold separator ml-0.5 mr-0.5"> / </span>
          )}
        </span>
      ))}

      {recipes.length > 0 && (
        <div className="flex">
          <Heading>{category.label}</Heading>
          {showMoreButton && moreButton}
        </div>
      )}

      <CategoryPages
        isHomePage={isHomePage}
        recipes={[
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
          ...recipes,
        ]}
      />
    </>
  );
};

export default Category;
