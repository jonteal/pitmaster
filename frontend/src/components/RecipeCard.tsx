import { RecipeType } from "@/services/recipes/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Link } from "react-router-dom";

type RecipeCardProps = {
  recipe: RecipeType;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => (
  <Card>
    <div className="p-4">
      <CardHeader className="text-lg font-semibold">{recipe.name}</CardHeader>
      <CardContent>
        <p className="text-gray-600">{recipe.description}</p>
        <div className="mt-4 flex justify-between">
          <span className="text-sm text-gray-500">
            Servings: {recipe.servings}
          </span>
          <span className="text-sm text-gray-500">
            Cooking Time: {recipe.cookingTime}
          </span>
        </div>
        <Link
          className="mt-4 inline-block btn btn-primary py-2 px-4 rounded"
          to={`/recipe/${recipe.recipeId}`}
        >
          View Recipe
        </Link>
      </CardContent>
    </div>
  </Card>
);
