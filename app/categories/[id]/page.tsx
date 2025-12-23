import { getCategories } from "@/app/lib/data";
import Category from "@/app/ui/elements/category/category";

const Categories = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((value) => value.id === id);

  return (
    <div className="container">
      {category && <Category category={category} />}
    </div>
  );
};

export default Categories;
