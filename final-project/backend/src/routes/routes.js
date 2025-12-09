import { Router } from 'express';
import { getCategories } from '../controllers/categoryController.js';
import { getRecipes, createRecipe, deleteRecipe, updateRecipe } from '../controllers/recipeController.js';


const router = Router();

// Rutas de Categorías
router.get('/categories', getCategories);

// Rutas de Recetas
router.get('/recipes', getRecipes);
router.post('/recipes', createRecipe);
router.delete('/recipes/:id', deleteRecipe);
router.put('/recipes/:id', updateRecipe);

export default router;