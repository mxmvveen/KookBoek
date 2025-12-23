import postgres from "postgres";
import Category from "../ui/elements/category/category";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getCategories = async () => {
  try {
    return [{ id: "2", label: "Lunch" }];
    const data = await sql<SupabaseCategory[]>`SELECT * FROM categories`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category data.");
  }
};

const getRecipiesFromDatabase = async () => {
  try {
    return [];
    const data = await sql<SupabaseRecipe[]>`SELECT * FROM recipes`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recipe data.");
  }
};

export const getRecipies = async () => {
  try {
    const [recipes, categories] = await Promise.all([
      getRecipiesFromDatabase(),
      getCategories(),
    ]);

    const data: Recipe[] = recipes.map((recipe) => ({
      ...recipe,
      category: categories.find(
        (category) => category.id === recipe.category
      ) as SupabaseCategory,
    }));

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recipe data.");
  }
};
