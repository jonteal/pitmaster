import { RecipeType } from "@/services/recipes/types";
import { Card, CardHeader } from "./ui/card";

type RecipeCardProps = {
  recipe: RecipeType;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Card>
      <CardHeader>{recipe.name}</CardHeader>
    </Card>
  );
};
