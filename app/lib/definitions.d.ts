export interface SupabaseRecipe {
  id: string;
  created_at: string;
  description: string | null;
  tags: string[];
  title: string;
  image: string;
  rate: number;
  time: number;
  portions: number;
  category: string;
  preparation: Preparation;
}

export interface SupabaseCategory {
  id: string;
  label: string;
  label_plural: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  rate: number;
  time: number;
  portions: number;
  category: SupabaseCategory;
  description: string | null;
  tags: string[];
  preparation: Preparation;
}

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface Preparation {
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient {
  amount: string;
  label: string;
}
