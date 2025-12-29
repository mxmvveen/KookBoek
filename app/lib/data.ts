import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getCategories = async (): Promise<SupabaseCategory[]> => {
  try {
    return [
      {
        id: "2",
        label: "Hoofdgerecht",
        label_plural: "Hoofdgerechten",
      },
      {
        id: "1",
        label: "Lunch",
        label_plural: "Lunches",
      },
    ];
    const data = await sql<SupabaseCategory[]>`SELECT * FROM categories`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch category data.");
  }
};

const getRecipiesFromDatabase = async (): Promise<SupabaseRecipe[]> => {
  try {
    return [
      {
        id: "2",
        created_at: "2025-12-17T15:30:10.477Z",
        title: "Prei ovenschotel",
        rate: 3,
        time: 45,
        portions: 4,
        image:
          "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/oveschotel_prei.jpg",
        description: null,
        tags: null,
        category: "2",
      },
      {
        id: "1",
        created_at: "2025-12-15T14:44:58.425Z",
        title: "Pasta carbonara",
        rate: 4,
        time: 11,
        portions: 1,
        image:
          "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/carbonara.jpg",
        description:
          "De klassieke spaghetti carbonara bestaat uit maar 4 ingrediënten: spaghetti, eieren, guanciale (wangspek) en Pecorino Romano. Geen room dus! En ook geen knoflook.",
        tags: "pasta, hoofdgerecht, italiaans, mediterraans",
        category: "2",
      },
      {
        id: "3",
        created_at: "2025-12-23T14:03:05.393Z",
        title: "mexicaanse ovenschotel",
        rate: 3.5,
        time: 50,
        portions: 3,
        image:
          "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/club%20sandwich.webp",
        description: null,
        tags: null,
        category: "2",
      },
      {
        id: "4",
        created_at: "2025-12-23T14:10:44.147Z",
        title: "Club sandwich",
        rate: 4,
        time: 15,
        portions: 1,
        image:
          "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/IMG_1341-1.jpg.webp",
        description: null,
        tags: null,
        category: "1",
      },
    ];
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
