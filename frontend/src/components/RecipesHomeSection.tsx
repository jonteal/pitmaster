import { RecipeCard } from "./RecipeCard";
import { useGetRecipes } from "@/services/recipes/recipeServiceHooks";

export const RecipesHomeSection = () => {
  const { data: recipes, isLoading, isError } = useGetRecipes();

  console.log("recipes: ", recipes);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {recipes?.map((recipe) => (
        <div key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};
