import express from 'express'
import recipesRoutes from './recipes.js'
import usersRoutes from './users.js'

const router = express.Router()

router.use('/users',usersRoutes)
router.use('/recipes',recipesRoutes)

router.get('*',(req,res)=>res.send(`<div style="text-align:center"><h1>404 NOT FOUND</h1><p>The requested endpoint does not exists</p></div>`))

export default router