import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet()); // security middleware that adds http security headers
app.use(morgan("dev")); // log the requests to the console

// apply arcjet rate limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifics that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (
      decision.results.some(
        (resulte) => resulte.reason.isBot() && resulte.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
    }

    next();
  } catch (error) {
    console.log("Arcjet error: ", error);
    next(error);
  }
});

app.use("/api/recipes", recipeRoutes);

async function initDB() {
  try {
    // Uncomment the following lines to drop the tables if they exist
    // await sql`DROP TABLE IF EXISTS recipe_tags`;
    // await sql`DROP TABLE IF EXISTS ingredients`;
    // await sql`DROP TABLE IF EXISTS steps`;
    // await sql`DROP TABLE IF EXISTS tags`;
    // await sql`DROP TABLE IF EXISTS recipes`;

    await sql`
  CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  servings INTEGER,
  cooking_time INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

    await sql`
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity TEXT,
  unit TEXT
);
`;

    await sql`
CREATE TABLE steps (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  description TEXT NOT NULL
);
`;

    await sql`
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);
`;

    await sql`
CREATE TABLE recipe_tags (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE
);
`;

    console.log("database initialized successfully");
  } catch (error) {
    console.log("Error initDB ", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
