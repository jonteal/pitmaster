import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { RecipeFormType, RecipeType } from "./types";
import { api } from "../api";
import { on } from "events";

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

export const useUpdateRecipe = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation<RecipeType, Error, RecipeType>({
    mutationFn: async (updatedRecipe: RecipeType) =>
      api.put(`/${updatedRecipe.id}`, updatedRecipe),
    onSuccess: (_, updatedRecipe) => {
      queryClient.invalidateQueries({
        queryKey: [baseRecipeQueryKey],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [`${baseRecipeQueryKey}-${updatedRecipe.id}`],
        exact: true,
      });
      onSuccess();
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (recipeId: string) => api.delete(`/${recipeId}`),
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries({
        queryKey: [baseRecipeQueryKey],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: [`${baseRecipeQueryKey}-${recipeId}`],
        exact: true,
      });
    },
  });
};
