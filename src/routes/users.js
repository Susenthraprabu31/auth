import express from 'express'
import usersController from '../controller/users.js'
import verifyAuth from '../middleware/verifyAuth.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router = express.Router()

router.get('/getAllUsers',verifyAuth,verifyAdmin,usersController.getAllUsers)
router.get('/getUserById/:id',verifyAuth,usersController.getUserById)
router.post('/createUser',usersController.createUser)
router.post('/login',usersController.login)
router.put('/editUserById/:id',verifyAuth,usersController.editUserById)
router.put('/changePassword',verifyAuth,usersController.changePassword)
router.delete('/deleteUserById/:id',verifyAuth,verifyAdmin,usersController.deleteUserById)


export default router