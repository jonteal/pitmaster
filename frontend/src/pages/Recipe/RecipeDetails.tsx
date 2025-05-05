import { NameValuePair } from "@/components/NameValuePair";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import {
  useDeleteRecipe,
  useGetRecipeById,
} from "@/services/recipes/recipeServiceHooks";
import { convertMinutesToHours } from "@/utils/Utilities";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const deleteRecipeMutation = useDeleteRecipe();

  const { data: recipe, isLoading } = useGetRecipeById(recipeId as string);
  console.log("recipe: ", recipe);

  const handleDelete = () => {
    deleteRecipeMutation.mutate(recipeId as string, {
      onSuccess: () => {
        // Handle success, e.g., redirect or show a success message
        toast("Recipe has been deleted succcessfully.");

        navigate("/");
      },
      onError: () => {
        // Handle error, e.g., show an error message
        toast("Error deleting recipe");
      },
    });
  };

  if (isLoading) {
    return <SkeletonCard />;
  }
  return (
    <div>
      <NameValuePair type="heading" name="Name" value={recipe?.name || ""} />
      <NameValuePair name="Description" value={recipe?.description || ""} />
      <NameValuePair name="Servings" value={recipe?.servings || ""} />
      <NameValuePair
        name="Cooking Time"
        value={convertMinutesToHours(recipe?.cookingTime || 0)}
      />

      <h3 className="underline font-bold mt-3 text-gray-400">Ingredients</h3>
      <div>
        {recipe?.ingredients.map((ingredient) => (
          <div
            className="flex flex-row w-1/2 justify-between"
            key={ingredient.id}
          >
            <p className="text-gray-200">{ingredient.name}</p>
            <div>
              <p className="text-gray-200">
                {ingredient.quantity} {ingredient.unit}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="underline font-bold mt-3 text-gray-400">Steps</h3>
      <div>
        {recipe?.steps.map((step) => (
          <div className="flex flex-row w-1/2 justify-between" key={step.id}>
            <p className="text-gray-200">{`${step.stepNumber}. `}</p>
            <p className="ml-2 text-gray-200">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-row mt-3">
        {recipe?.tags.map((tag) => (
          <p
            className="text-gray-900 mr-2 bg-amber-500 rounded-3xl px-2 py-1"
            key={tag}
          >{`#${tag}`}</p>
        ))}
      </div>

      <div className="flex flex-row mt-3">
        <Button className="btn btn-primary mr-2">Edit</Button>
        <Button onClick={handleDelete} className="btn btn-primary">
          Delete
        </Button>
      </div>
    </div>
  );
};
