import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { RecipeDetails } from "@/pages/Recipe/RecipeDetails";
import { AddRecipe } from "@/pages/Recipe/AddRecipe";
import { RecipesLayout } from "@/components/layout/RecipesLayout";
import { ErrorPage } from "@/pages/ErrorPage";

export const PageRouter = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/add" element={<AddRecipe />} />
    <Route path="recipe">
      <Route element={<RecipesLayout />}>
        <Route path=":recipeId" element={<RecipeDetails />} />
      </Route>
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
