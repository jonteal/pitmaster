import { sql } from "../config/db.js";
export const getRecipes = async (req, res) => {
  try {
    const recipes = await sql`
        SELECT * FROM recipes
        ORDER BY created_at DESC
        `;
    console.log("fetched recipes: ", recipes);
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const createRecipe = async (req, res) => {
  const { name, description, imageUrl, servings, cookingTime } = req.body;

  if (!name || !description || !servings || !cookingTime) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required :)" });
  }

  try {
    const newRecipe = await sql`
    INSERT INTO recipes (name, description, servings, cookingTime, imageUrl)
    VALUES (${name}, ${description}, ${servings}, ${cookingTime}, ${imageUrl})
    RETURNING *
    `;

    console.log("new recipe added: ", newRecipe);
    res.status(201).json({ success: true, data: newRecipe[0] });
  } catch (error) {
    console.log("Error in createRecipe function", error);
  }
};
export const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = sql`
        SELECT * FROM recipes WHERE id=${id}
        `;

    res.status(200).json({ success: true, data: recipe[0] });
  } catch (error) {
    console.log("Error in getRecipe function: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, servings, cookingTime } = req.body;

  try {
    const updatedRecipe = await sql`
    UPDATE recipes
    SET name=${name}, description=${description}, imageUrl=${imageUrl}, servings=${servings}, cookingTime=${cookingTime}
    WHERE id=${id}
    RETURNING *
    `;

    if (updatedRecipe.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({ success: true, data: updateRecipe[0] });
  } catch (error) {
    console.log("Error in updateRecipe function: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await sql`
    DELETE FROM recipes WHERE id=${id} RETURNING *
    `;

    if (deletedRecipe.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({ success: true, data: deletedRecipe[0] });
  } catch (error) {
    console.log("Error in deleteRecipe function: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
