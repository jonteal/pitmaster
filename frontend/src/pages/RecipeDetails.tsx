import { NameValuePair } from "@/components/NameValuePair";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useGetRecipeById } from "@/services/recipes/recipeServiceHooks";
import { convertMinutesToHours } from "@/utils/Utilities";
import { useParams } from "react-router";

export const RecipeDetails = () => {
  const { recipeId } = useParams();

  const { data: recipe, isLoading } = useGetRecipeById(recipeId as string);

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
    </div>
  );
};
