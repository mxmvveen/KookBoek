import postgres from "postgres";
import { Recipe, SupabaseCategory, SupabaseRecipe } from "./definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const MOCK_RECIPES: SupabaseRecipe[] = [
  {
    id: "3",
    created_at: "2025-12-23T14:03:05.393Z",
    title: "mexicaanse ovenschotel",
    rate: 3.5,
    time: 50,
    portions: 3,
    image:
      "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/club%20sandwich.webp",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus totam reprehenderit eum assumenda illo. Tempore adipisci magni eligendi sint voluptatibus.",
    category: "2",
    tags: [],
    preparation: {
      steps: [
        "Lorem ipsum dolor sit",
        "amet consectetur adipisicing elit. Consectetur natus repellendus dolorem dolores Repudiandae sed quidem assumenda facilis odit cupiditate",
        "necessitatibus accusamus consectetur aliquam",
        "modi laborum dignissimos ipsam voluptate doloremque asperiores molestias animi voluptatem adipisci",
        "nostrum autem! Velit",
        "quidem dolor",
      ],
      ingredients: [
        {
          label: "Neque",
          amount: "300 g",
        },
        {
          label: "amet consectetur",
          amount: "200 g",
        },
        {
          label: "adipisicing elit",
          amount: "90 g",
        },
        {
          label: "doloremque",
          amount: "4",
        },
      ],
    },
  },
  {
    id: "2",
    created_at: "2025-12-17T15:30:10.477Z",
    title: "Prei ovenschotel",
    rate: 3,
    time: 45,
    portions: 4,
    image:
      "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/oveschotel_prei.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor doloribus odit eum ut voluptatum provident facere hic porro. Officiis, qui",
    category: "2",
    tags: [],
    preparation: {
      steps: [
        "Lorem ipsum dolor sit",
        "amet consectetur adipisicing elit. Consectetur natus repellendus dolorem dolores Repudiandae sed quidem assumenda facilis odit cupiditate",
        "necessitatibus accusamus consectetur aliquam",
        "modi laborum dignissimos ipsam voluptate doloremque asperiores molestias animi voluptatem adipisci",
        "nostrum autem! Velit",
        "quidem dolor",
      ],
      ingredients: [
        {
          label: "Neque",
          amount: "300 g",
        },
        {
          label: "amet consectetur",
          amount: "200 g",
        },
        {
          label: "adipisicing elit",
          amount: "90 g",
        },
        {
          label: "doloremque",
          amount: "4",
        },
      ],
    },
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
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, libero vel architecto magni maiores optio esse ad quasi! Nihil, quis.",
    category: "1",
    tags: [],
    preparation: {
      steps: [
        "Lorem ipsum dolor sit",
        "amet consectetur adipisicing elit. Consectetur natus repellendus dolorem dolores Repudiandae sed quidem assumenda facilis odit cupiditate",
        "necessitatibus accusamus consectetur aliquam",
        "modi laborum dignissimos ipsam voluptate doloremque asperiores molestias animi voluptatem adipisci",
        "nostrum autem! Velit",
        "quidem dolor",
      ],
      ingredients: [
        {
          label: "Neque",
          amount: "300 g",
        },
        {
          label: "amet consectetur",
          amount: "200 g",
        },
        {
          label: "adipisicing elit",
          amount: "90 g",
        },
        {
          label: "doloremque",
          amount: "4",
        },
      ],
    },
  },
  {
    id: "1",
    created_at: "2025-12-15T14:44:58.425Z",
    title: "Pasta carbonara",
    rate: 4,
    time: 11,
    portions: 4,
    image:
      "https://lrmjwdumepdcogkfhcej.supabase.co/storage/v1/object/public/recipe%20images/carbonara.jpg",
    description:
      "De klassieke spaghetti carbonara bestaat uit maar 4 ingrediënten: spaghetti, eieren, guanciale (wangspek) en Pecorino Romano. Geen room dus! En ook geen knoflook.",
    category: "2",
    tags: ["pasta", "hoofdgerecht", "italiaans", "mediterraans"],
    preparation: {
      steps: [
        "Kook de spaghetti volgens de aanwijzingen op de verpakking in goed gezouten water al dente, maar verkort de kooktijd met 1 min.",
        "Verhit ondertussen een grote koekenpan zonder boter of olie op middelhoog vuur. Bak de guanciale in 5 min. knapperig. Roer af en toe.",
        "Rasp ondertussen de pecorino. Splits de helft van de eieren. De eiwitten gebruik je niet. Voeg de eidooiers en overige eieren toe aan de pecorino. Breng op smaak met veel versgemalen zwarte peper. Voeg 3 el (per 4 personen) kookwater van de pasta toe en meng goed.",
        "Giet de pasta af, maar bewaar een kopje van het kookwater. Voeg de pasta met 1 el kookwater p.p. toe aan de guanciale in de koekenpan. Meng goed.",
        "Haal de pan van het vuur en roer het eimengsel erdoor. Meng tot het eimengsel een romige saus is geworden. Voeg eventueel extra pastawater toe om de saus romiger te maken.",
        "Verdeel de spaghetti over borden en breng op smaak met extra versgemalen zwarte peper. Bestrooi eventueel met extra pecorino.",
      ],
      ingredients: [
        {
          label: "spagetti",
          amount: "300 g",
        },
        {
          label: "guanciale blokjes",
          amount: "200 g",
        },
        {
          label: "pecorino romano",
          amount: "90 g",
        },
        {
          label: "middelgrote eieren",
          amount: "4",
        },
      ],
    },
  },
];

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
    return MOCK_RECIPES;
    const data = await sql<SupabaseRecipe[]>`SELECT * FROM recipes`;
    console.log(data);

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
