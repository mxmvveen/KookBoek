interface SupabaseRecipe {
  id: string;
  created_at: string;
  description: string | null;
  tags: string | null;
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
  id: string;
  title: string;
  image: string;
  rate: number;
  time: number;
  portions: number;
  category: SupabaseCategory;
}
