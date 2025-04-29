import { RecipeType } from "./services/recipes/types";

export const recipeData: RecipeType[] = [
  {
    recipeId: 1,
    name: "Baby Back Ribs",
    description: "Tender, juicy baby back ribs with a smoky barbecue glaze.",
    ingredients: [
      {
        ingredientId: "1",
        name: "Baby Back Ribs",
        quantity: "2",
        unit: "racks",
      },
      {
        ingredientId: "2",
        name: "Barbecue Sauce",
        quantity: "1",
        unit: "cup",
      },
      {
        ingredientId: "3",
        name: "Smoked Paprika",
        quantity: "1",
        unit: "tablespoon",
      },
      {
        ingredientId: "4",
        name: "Garlic Powder",
        quantity: "1",
        unit: "tablespoon",
      },
      {
        ingredientId: "5",
        name: "Salt and Pepper",
        quantity: "",
        unit: "",
      },
    ],
    steps: [
      {
        stepId: "1",
        stepDescription: "Preheat the grill to medium heat.",
      },
      {
        stepId: "2",
        stepDescription:
          "Rub the ribs with smoked paprika, garlic powder, salt, and pepper.",
      },
      {
        stepId: "3",
        stepDescription:
          "Grill the ribs for 2-3 hours, basting with barbecue sauce every 30 minutes.",
      },
      {
        stepId: "4",
        stepDescription:
          "Remove from grill and let rest for 10 minutes before slicing.",
      },
    ],
    imageUrl: "https://example.com/images/baby_back_ribs.jpg",
    cookingTime: 180,
    servings: 4,
    tags: ["grill", "barbecue", "meat"],
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
  },
  {
    recipeId: 2,
    name: "Smoked Beef Brisket",
    description: "A succulent smoked beef brisket with a rich, smoky flavor.",
    ingredients: [
      {
        ingredientId: "1",
        name: "Beef Brisket",
        quantity: "1",
        unit: "whole",
      },
      {
        ingredientId: "2",
        name: "Kosher Salt",
        quantity: "2",
        unit: "tablespoons",
      },
      {
        ingredientId: "3",
        name: "Black Pepper",
        quantity: "1",
        unit: "tablespoon",
      },
      {
        ingredientId: "4",
        name: "Garlic Powder",
        quantity: "1",
        unit: "tablespoon",
      },
      {
        ingredientId: "5",
        name: "Onion Powder",
        quantity: "1",
        unit: "tablespoon",
      },
      {
        ingredientId: "6",
        name: "Wood Chips for Smoking",
        quantity: "",
        unit: "",
      },
    ],
    steps: [
      {
        stepId: "1",
        stepDescription:
          "Rub the brisket with salt, pepper, garlic powder, and onion powder.",
      },
      {
        stepId: "2",
        stepDescription: "Preheat the smoker to 225°F (107°C).",
      },
      {
        stepId: "3",
        stepDescription: "Place the brisket in the smoker and add wood chips.",
      },
      {
        stepId: "4",
        stepDescription:
          "Smoke for 10-12 hours, or until the internal temperature reaches 195°F (90°C).",
      },
      {
        stepId: "5",
        stepDescription: "Let rest for 30 minutes before slicing.",
      },
    ],
    imageUrl: "https://example.com/images/smoked_beef_brisket.jpg",
    cookingTime: 720,
    servings: 8,
    tags: ["smoke", "barbecue", "meat"],
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
  },
  {
    recipeId: 3,
    name: "Grilled Vegetable Skewers",
    description: "Colorful and flavorful grilled vegetable skewers.",
    ingredients: [
      {
        ingredientId: "1",
        name: "Zucchini",
        quantity: "1",
        unit: "whole",
      },
      {
        ingredientId: "2",
        name: "Bell Pepper",
        quantity: "1",
        unit: "whole",
      },
      {
        ingredientId: "3",
        name: "Red Onion",
        quantity: "1",
        unit: "whole",
      },
      {
        ingredientId: "4",
        name: "Cherry Tomatoes",
        quantity: "1",
        unit: "cup",
      },
      {
        ingredientId: "5",
        name: "Olive Oil",
        quantity: "2",
        unit: "tablespoons",
      },
      {
        ingredientId: "6",
        name: "Salt and Pepper",
        quantity: "",
        unit: "",
      },
    ],
    steps: [
      {
        stepId: "1",
        stepDescription: "Preheat the grill to medium heat.",
      },
      {
        stepId: "2",
        stepDescription:
          "In a bowl, toss the vegetables with olive oil, salt, and pepper.",
      },
      {
        stepId: "3",
        stepDescription: "Thread the vegetables onto skewers.",
      },
      {
        stepId: "4",
        stepDescription:
          "Grill for 10-15 minutes, turning occasionally, until tender and slightly charred.",
      },
    ],
    imageUrl: "https://example.com/images/grilled_vegetable_skewers.jpg",
    cookingTime: 15,
    servings: 4,
    tags: ["grill", "vegetarian", "healthy"],
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
  },
];
