import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
