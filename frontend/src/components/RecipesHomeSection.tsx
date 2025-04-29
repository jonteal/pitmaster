import { recipeData } from "@/data";
import { RecipeCard } from "./RecipeCard";

export const RecipesHomeSection = () => {
  console.log("recipeData: ", recipeData);
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
