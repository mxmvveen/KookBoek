import { getCategories } from "@/app/lib/data";
import CategoryRecipes from "@/app/ui/elements/category/category";

const Category = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((value) => value.id === id);

  return (
    <div className="container">
      {category && <CategoryRecipes category={category} />}
    </div>
  );
};

export default Category;
