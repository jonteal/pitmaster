type IngredientType = {
  ingredientId: string;
  name: string;
  quantity: string;
  unit: string;
};

type StepType = {
  stepId: string;
  stepDescription: string;
};

export type RecipeType = {
  recipeId: number;
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
