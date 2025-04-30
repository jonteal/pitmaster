import { recipeData } from "@/data";
import { RecipeCard } from "./RecipeCard";
import { useGetRecipes } from "@/services/recipes/recipeServiceHooks";

export const RecipesHomeSection = () => {
  console.log("recipeData: ", recipeData);

  const { data, isLoading, isError } = useGetRecipes();

  console.log("data: ", data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {recipeData.map((recipe) => (
        <div key={recipe.recipeId}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};
