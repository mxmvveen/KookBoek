import React from "react";
import RecipeCard from "../RecipeCard/recipe-card";

interface CategoryRowProps {
  items: React.ReactNode[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({ items }) => {
  return (
    <>
      {items.map((item, key) => (
        <RecipeCard key={key} />
      ))}
    </>
  );
};

export default CategoryRow;
