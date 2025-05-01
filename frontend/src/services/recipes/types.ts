type IngredientType = {
  id: number;
  recipeId: number;
  name: string;
  quantity: string;
  unit: string;
};

type StepType = {
  id: number;
  recipeId: number;
  description: string;
  stepNumber: number;
};

export type RecipeType = {
  id: number;
  name: string;
  description: string;
  ingredients: IngredientType[];
  steps: StepType[];
  imageUrl: string;
  servings: number;
  tags: string[];
  cookingTime: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

// Form-only types
export type IngredientFormType = {
  name: string;
  quantity: string;
  unit: string;
};

export type StepFormType = {
  description: string;
};

export type RecipeFormType = {
  name: string;
  description: string;
  imageUrl: string;
  servings: number;
  cookingTime: number;
  ingredients: IngredientFormType[];
  steps: StepFormType[];
  tags: string[];
};
