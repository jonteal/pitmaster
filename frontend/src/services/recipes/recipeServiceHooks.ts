import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { RecipeFormType, RecipeType } from "./types";
import { api } from "../api";

// const baseURL = "http://localhost:3000/api/recipes";

export const baseRecipeQueryKey = "recipe";

export const useGetRecipes = () => {
  return useQuery<RecipeType[]>({
    queryKey: [baseRecipeQueryKey],
    queryFn: async () => api.get(""),
  });
};

export const useGetRecipeById = (recipeId: string) => {
  return useQuery<RecipeType>({
    queryKey: [baseRecipeQueryKey, recipeId],
    queryFn: async () => api.get(`/${recipeId}`),
  });
};

export const useAddRecipe = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation<RecipeFormType, Error, RecipeFormType>({
    mutationFn: async (newRecipe: RecipeFormType) => api.post("", newRecipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [baseRecipeQueryKey] });
      onSuccess();
    },
  });
};
