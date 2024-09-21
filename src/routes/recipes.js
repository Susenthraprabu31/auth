import express from 'express'
import recipeController from '../controller/recipes.js'
const router = express.Router()
import verifyAuth from '../middleware/verifyAuth.js'

router.get('/getAllRecipes',verifyAuth,recipeController.getAllRecipes)
router.get('/getAllRecipesByUserId/:id',verifyAuth,recipeController.getAllRecipesByUserId)
router.post('/createRecipe',verifyAuth,recipeController.createRecipe)

export default router