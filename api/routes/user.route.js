const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')
const multer = require('multer');
const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

//register user account details
router.post('/register',userController.addUser)

//reset 
router.post('/resetpassword',userController.resetPassword)

//resets users password
router.post('/passwordreset',userController.passwordReset)

//login request
router.post('/login',userController.login)

//Get users by role
router.get('/role',userController.getUsersByRole)

//Get users by role
router.get('/role/admin',userController.getAdmins)

//Get clients by 
router.get('/role/user',userController.getClients)


//set user assign role to user
router.put('/role/assign',userController.addUserRole)

//Get all users
router.get('/',authMiddleware,isAdmin,userController.findAll)
//Get all users
router.post('/',authMiddleware,isAdmin,userController.addNewUser)
//Get single user
router.get('/:id',authMiddleware,isAdmin,userController.findSingleUser)
//Get single user
router.get('/logged/:id',userController.findloggedInUser)
//Update user details
router.put('/:id',authMiddleware,isAdmin,userController.updateUserDetails)
//deletes user
router.delete('/:id',userController.deleteUser)
module.exports = router