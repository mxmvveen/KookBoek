"use client";
import { ChangeEvent, useMemo, useState } from "react";
import RecipeCard from "../RecipeCard/recipe-card";
import { Pagination } from "@mui/material";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 16;
const ROW_SIZE = 4;

const PAGE_PARAM_KEY = "page";

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

const paginate = <T,>(
  items: T[],
  pageNumber: number,
  pageSize: number
): T[] => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

const CategoryPages: React.FC<{
  recipes: Recipe[];
  isHomePage?: boolean;
}> = ({ recipes, isHomePage }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageNumber: string | null = searchParams.get(PAGE_PARAM_KEY);

  const [currentPage, setCurrentPage] = useState<number>(
    Number(pageNumber) || 1
  );

  const numberOfPages: number = useMemo(
    () => Math.ceil(recipes.length / PAGE_SIZE),
    [recipes]
  );

  const recipeRows: Array<Recipe[]> = chunkArray(
    paginate(recipes, currentPage, PAGE_SIZE),
    ROW_SIZE
  );

  const onPageChange = (event: ChangeEvent<unknown>, page: number) => {
    router.push(
      `${pathname}?` +
        new URLSearchParams({ [PAGE_PARAM_KEY]: page.toString() }).toString()
    );

    setCurrentPage(page);
  };

  return (
    <>
      {recipeRows.map((recipeRow, key) => {
        if (isHomePage && key > 0) {
          return null;
        }
        return (
          <div
            className="flex flex-no-wrap -ml-2 -mr-2 flex-wrap mb-8"
            key={key}
          >
            {recipeRow.map((recipe, key) => (
              <RecipeCard recipe={recipe} key={key} />
            ))}
          </div>
        );
      })}

      {!isHomePage && (
        <div className="flex justify-center">
          <Pagination
            count={numberOfPages}
            page={currentPage}
            siblingCount={2}
            boundaryCount={1}
            onChange={onPageChange}
            color={"standard"}
          />
        </div>
      )}
    </>
  );
};

export default CategoryPages;
