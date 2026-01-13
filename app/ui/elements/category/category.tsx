import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Heading from "../heading/heading";
import { getRecipies } from "@/app/lib/data";
import { JSX, Suspense } from "react";
import CategoryPages from "./category-pages";
import Link from "next/link";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { SupabaseCategory, Recipe, Breadcrumb } from "@/app/lib/definitions";

interface CategoryProps {
  isHomePage?: boolean;
  category: SupabaseCategory;
}

const CategoryRecipes: React.FC<CategoryProps> = async ({
  isHomePage,
  category,
}) => {
  const recipes: Recipe[] = (await getRecipies()).filter(
    (value) => value.category?.id === category.id
  );

  const breadcrumbs: Breadcrumb[] = [
    { label: "home", url: "/" },
    { label: category.label, url: `/categories/${category.id}` },
  ];

  const showMoreButton = isHomePage && recipes.length > 0;

  const moreButton: JSX.Element = (
    <div className="ml-auto pt-7.5">
      <Link href={`categories/${category.id}`}>
        <Button component="span" href={`categories/${category.id}`}>
          Alle {category.label_plural}
          <FontAwesomeIcon className="icon" icon={faChevronRight} />
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      {!isHomePage && <Breadcrumbs breadcrumbs={breadcrumbs} />}

      {recipes.length > 0 && (
        <div className="flex">
          <Heading>{category.label}</Heading>
          {showMoreButton && moreButton}
        </div>
      )}
      <Suspense>
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
      </Suspense>
    </>
  );
};

export default CategoryRecipes;
