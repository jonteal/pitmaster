import { sql } from "../config/db.js";
import { keysToCamel } from "../utils/utils.js";

const formatRecipe = (recipe) => ({
  id: recipe.id,
  name: recipe.name,
  description: recipe.description,
  imageUrl: recipe.image_url,
  servings: recipe.servings,
  cookingTime: recipe.cooking_time,
  createdAt: recipe.created_at,
  updatedAt: recipe.updated_at,
});

export const getRecipes = async (req, res) => {
  try {
    const recipes = await sql`
        SELECT * FROM recipes
        ORDER BY created_at DESC
        `;
    console.log("fetched recipes: ", recipes);
    res.status(200).json({ success: true, data: keysToCamel(recipes) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createRecipe = async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    servings,
    cookingTime,
    ingredients,
    steps,
    tags,
  } = req.body;

  try {
    const [recipe] = await sql`
      INSERT INTO recipes (name, description, image_url, servings, cooking_time)
      VALUES (${name}, ${description}, ${imageUrl}, ${servings}, ${cookingTime})
      RETURNING *
    `;

    // Insert ingredients
    for (const ing of ingredients) {
      await sql`
        INSERT INTO ingredients (recipe_id, name, quantity, unit)
        VALUES (${recipe.id}, ${ing.name}, ${ing.quantity}, ${ing.unit})
      `;
    }

    // Insert steps
    for (let i = 0; i < steps.length; i++) {
      await sql`
        INSERT INTO steps (recipe_id, step_number, description)
        VALUES (${recipe.id}, ${i + 1}, ${steps[i].stepDescription})
      `;
    }

    // Insert tags
    for (const tagName of tags) {
      // check if tag exists, insert if not
      const existing = await sql`SELECT id FROM tags WHERE name = ${tagName}`;
      let tagId;

      if (existing.length === 0) {
        const [newTag] =
          await sql`INSERT INTO tags (name) VALUES (${tagName}) RETURNING id`;
        tagId = newTag.id;
      } else {
        tagId = existing[0].id;
      }

      // link to recipe
      await sql`INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (${recipe.id}, ${tagId})`;
    }

    res.status(201).json({ success: true, data: keysToCamel(recipe) });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// export const createRecipe = async (req, res) => {
//   const { name, description, imageUrl, servings, cookingTime } = req.body;

//   if (!name || !description || !servings || !cookingTime) {
//     return res
//       .status(400)
//       .json({ success: false, message: "All fields are required :)" });
//   }

//   try {
//     const newRecipe = await sql`
//     INSERT INTO recipes (name, description, servings, cookingTime, imageUrl)
//     VALUES (${name}, ${description}, ${servings}, ${cookingTime}, ${imageUrl})
//     RETURNING *
//     `;

//     console.log("new recipe added: ", newRecipe);
//     res.status(201).json({ success: true, data: newRecipe[0] });
//   } catch (error) {
//     console.log("Error in createRecipe function", error);
//   }
// };
// export const getRecipe = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const recipe = await sql`
//         SELECT * FROM recipes WHERE id=${id}
//         `;

//     res.status(200).json({ success: true, data: recipe[0] });
//   } catch (error) {
//     console.log("Error in getRecipe function: ", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

export const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const [recipe] = await sql`SELECT * FROM recipes WHERE id = ${id}`;
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const ingredients = await sql`
      SELECT * FROM ingredients WHERE recipe_id = ${id} ORDER BY id
    `;

    const steps = await sql`
      SELECT * FROM steps WHERE recipe_id = ${id} ORDER BY step_number
    `;

    const tags = await sql`
      SELECT t.name FROM recipe_tags rt
      JOIN tags t ON rt.tag_id = t.id
      WHERE rt.recipe_id = ${id}
    `;

    res.status(200).json({
      success: true,
      data: keysToCamel({
        ...recipe,
        ingredients,
        steps,
        tags: tags.map((t) => t.name),
      }),
    });
  } catch (error) {
    console.error("Error in getRecipe: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    imageUrl,
    servings,
    cookingTime,
    ingredients,
    steps,
    tags,
  } = req.body;

  try {
    // 1. Update the main recipe fields
    await sql`
      UPDATE recipes
      SET name = ${name},
          description = ${description},
          imageUrl = ${imageUrl},
          servings = ${servings},
          cookingTime = ${cookingTime},
          updated_at = NOW()
      WHERE id = ${id}
    `;

    // 2. Delete old related data
    await sql`DELETE FROM ingredients WHERE recipe_id = ${id}`;
    await sql`DELETE FROM steps WHERE recipe_id = ${id}`;
    await sql`DELETE FROM recipe_tags WHERE recipe_id = ${id}`;

    // 3. Re-insert ingredients
    for (const ing of ingredients) {
      await sql`
        INSERT INTO ingredients (recipe_id, name, quantity, unit)
        VALUES (${id}, ${ing.name}, ${ing.quantity}, ${ing.unit})
      `;
    }

    // 4. Re-insert steps
    for (let i = 0; i < steps.length; i++) {
      await sql`
        INSERT INTO steps (recipe_id, step_number, description)
        VALUES (${id}, ${i + 1}, ${steps[i].stepDescription})
      `;
    }

    // 5. Re-insert tags (ensure tags exist in the tag table first)
    for (const tagName of tags) {
      let tagId;
      const existing = await sql`SELECT id FROM tags WHERE name = ${tagName}`;

      if (existing.length === 0) {
        const [newTag] = await sql`
          INSERT INTO tags (name) VALUES (${tagName}) RETURNING id
        `;
        tagId = newTag.id;
      } else {
        tagId = existing[0].id;
      }

      await sql`
        INSERT INTO recipe_tags (recipe_id, tag_id)
        VALUES (${id}, ${tagId})
      `;
    }

    res.status(200).json({ success: true, message: "Recipe updated." });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update recipe" });
  }
};

// export const updateRecipe = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, imageUrl, servings, cookingTime } = req.body;

//   try {
//     const updatedRecipe = await sql`
//     UPDATE recipes
//     SET name=${name}, description=${description}, imageUrl=${imageUrl}, servings=${servings}, cookingTime=${cookingTime}
//     WHERE id=${id}
//     RETURNING *
//     `;

//     if (updatedRecipe.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Recipe not found",
//       });
//     }

//     res.status(200).json({ success: true, data: updateRecipe[0] });
//   } catch (error) {
//     console.log("Error in updateRecipe function: ", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
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
