import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RecipeType } from "./types";

// const baseURL = "http://localhost:3000/api/recipes";
const api = axios.create({
  baseURL: "http://localhost:3000/api/recipes",
});

api.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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
