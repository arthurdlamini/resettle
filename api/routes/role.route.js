const express = require('express');
const router = express.Router()
const userRoleController = require('../controllers/RoleController')

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');
//find all roles
router.get('/',authMiddleware,isAdmin,userRoleController.findRoles)
//find roles by id
router.get('/:id',authMiddleware,isAdmin,userRoleController.findRoleById)
//add new role
router.post('/',authMiddleware,isAdmin,userRoleController.addRole)
//delete role
router.delete('/:id',authMiddleware,isAdmin,userRoleController.deleteRole)
//update role
router.put('/:id', authMiddleware,isAdmin,userRoleController.updateRole)

module.exports = router;