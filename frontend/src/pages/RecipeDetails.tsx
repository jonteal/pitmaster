import { useGetRecipeById } from "@/services/recipes/recipeServiceHooks";
import { useParams } from "react-router";

export const RecipeDetails = () => {
  const { recipeId } = useParams();

  const { data } = useGetRecipeById(recipeId as string);
  console.log("data: ", data);
  return <div>RecipeDetails</div>;
};
