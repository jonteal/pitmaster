import { NameValuePair } from "@/components/NameValuePair";
import { useGetRecipeById } from "@/services/recipes/recipeServiceHooks";
import { convertMinutesToHours } from "@/utils/Utilities";
import { useParams } from "react-router";

export const RecipeDetails = () => {
  const { recipeId } = useParams();

  const { data: recipe } = useGetRecipeById(recipeId as string);
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
