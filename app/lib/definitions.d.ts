interface SupabaseRecipe {
  id: number;
  title: string;
  image: string;
  rate: number;
  time: number;
  portions: number;
  category: string;
}

interface SupabaseCategory {
  id: string;
  label: string;
  label_plural: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  rate: number;
  time: number;
  portions: number;
  category: SupabaseCategory;
}
