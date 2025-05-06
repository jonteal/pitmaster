import { RecipeFormType, RecipeType } from "@/services/recipes/types";
import { RecipeForm } from "./components/RecipeForm";
import {
  useGetRecipeById,
  useUpdateRecipe,
} from "@/services/recipes/recipeServiceHooks";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

export const EditRecipe = () => {
  const navigate = useNavigate();

  const { recipeId } = useParams();
  const { data: recipe } = useGetRecipeById(recipeId as string);

  const updateRecipeMutation = useUpdateRecipe({
    onSuccess: () => {
      // Handle success, e.g., redirect or show a success message
      toast("Recipe has been updated successfully.");
      navigate(`/recipe/${recipeId}`);
    },
  });

  const handleEdit = (formData: RecipeType) => {
    updateRecipeMutation.mutate({ ...recipe, ...formData });
  };
  return (
    <div>
      <h1>Edit Recipe</h1>
      {/* <RecipeForm onSubmit={handleEdit} recipe={recipe} /> */}
    </div>
  );
};
