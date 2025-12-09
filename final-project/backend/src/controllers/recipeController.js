import pool from '../db/pool.js';
import { z } from 'zod';

const recipeSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  ingredients: z.string().min(1, "Los ingredientes son obligatorios"),
  instructions: z.string().min(1, "Las instrucciones son obligatorias"),
  category_id: z.number().int().positive()
});

export const getRecipes = async (req, res) => {
  try {
    const sql = `
      SELECT recipes.*, categories.name as category_name 
      FROM recipes 
      LEFT JOIN categories ON recipes.category_id = categories.id
      ORDER BY recipes.created_at DESC
    `;
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const validation = recipeSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues });
    }

    const { title, ingredients, instructions, category_id } = validation.data;

    const sql = `
      INSERT INTO recipes (title, ingredients, instructions, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(sql, [title, ingredients, instructions, category_id]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la receta' });
  }
};

// PUT: Actualizar receta existente
export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  
  // 1. Validar datos
  const validation = recipeSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.issues });
  }

  const { title, ingredients, instructions, category_id } = validation.data;

  try {
    // 2. Actualizar en BD
    const sql = `
      UPDATE recipes 
      SET title = $1, ingredients = $2, instructions = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `;
    const result = await pool.query(sql, [title, ingredients, instructions, category_id, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar receta' });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING id', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar receta' });
  }
};