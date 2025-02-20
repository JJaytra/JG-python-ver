import express, { Request, Response } from "express";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize Supabase client
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_KEY || "";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Type for Recipe
interface Recipe {
  created_by: string;
  name: string;
  ingredients: string;
  instructions: string;
  cooking_time: number;
}

// Utility function for error handling
const handleError = (res: Response, error: any) => {
  console.error("Error:", error);
  return res.status(500).json({ error: (error as Error).message });
};

// Routes
app.post("/recipe/create", async (req: Request, res: Response) => {
  const data: Recipe = req.body;

  if (!data) {
    return res.status(400).json({ error: "No data received" });
  }

  try {
    const { data: response, error } = await supabase.from("recipes").insert([
      {
        created_by: data.created_by,
        name: data.name,
        ingredients: data.ingredients,
        instructions: data.instructions,
        cooking_time: data.cooking_time,
      },
    ]);

    if (error) throw error;
    return res
      .status(201)
      .json({ message: "Recipe added successfully", data: response });
  } catch (error) {
    return handleError(res, error);
  }
});

app.get("/recipes", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("recipes").select("*");
    if (error) throw error;
    return res.json(data);
  } catch (error) {
    return handleError(res, error);
  }
});

app.delete("/recipe/delete/:recipe_id", async (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.recipe_id, 10);

  if (isNaN(recipeId)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    const { data, error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", recipeId);
    if (error) throw error;
    return res.json({ message: "Recipe deleted successfully", data });
  } catch (error) {
    return handleError(res, error);
  }
});

app.get("/recipe/retrieve/:recipe_id", async (req: Request, res: Response) => {
  const recipeId = parseInt(req.params.recipe_id, 10);

  if (isNaN(recipeId)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", recipeId);
    if (error) throw error;
    return res.json(data);
  } catch (error) {
    return handleError(res, error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
