import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Heading from "../heading/heading";
import CategoryRow from "./category-row";

const ARRAY_SIZE = 4;

const chunkArray = (array: React.ReactNode[], size: number) => {
  const response = [];
  for (let i = 0; i < array.length; i += size) {
    response.push(array.slice(i, size + i));
  }
  return response;
};

interface CategoryProps {
  isHomePage?: boolean;
}

const Category: React.FC<CategoryProps> = ({ isHomePage }) => {
  const elements = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], ARRAY_SIZE);
  return (
    <>
      <div className="flex">
        <Heading>Lunches</Heading>
        {isHomePage && (
          <div className="ml-auto pt-7.5">
            <Button>
              Alle lunches
              <FontAwesomeIcon className="icon" icon={faChevronRight} />
            </Button>
          </div>
        )}
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
            <CategoryRow items={items} />
          </div>
        );
      })}
    </>
  );
};

export default Category;
