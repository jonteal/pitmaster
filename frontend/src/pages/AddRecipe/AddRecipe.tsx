import { useAddRecipe } from "@/services/recipes/recipeServiceHooks";
import { RecipeFormType } from "@/services/recipes/types";
import { useNavigate } from "react-router";
import { RecipeForm } from "./components/RecipeForm";
import { SubmitHandler } from "react-hook-form";

export const AddRecipe = () => {
  const navigate = useNavigate();

  const addRecipeMutation = useAddRecipe({
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleAdd: SubmitHandler<RecipeFormType> = (formData) => {
    // Transform ingredients
    const ingredients = formData.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      // id and recipeId will be added by backend
    }));

    // Transform steps
    const steps = formData.steps.map((step, index) => ({
      description: step.description,
      stepNumber: index + 1, // required by backend
      // id and recipeId will be added by backend
    }));

    // Final payload
    const payload = {
      name: formData.name,
      description: formData.description,
      servings: formData.servings,
      imageUrl: formData.imageUrl,
      cookingTime: formData.cookingTime,
      ingredients,
      steps,
      tags: formData.tags, // assume strings, backend will join them
    };

    addRecipeMutation.mutate(payload);
  };

  return (
    <div>
      <h1 className="text-2xl">Add Recipe</h1>
      <RecipeForm onSubmit={handleAdd} />
    </div>
  );
};
