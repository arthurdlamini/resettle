const  express = require('express');
const router = express.Router();
const treeController = require("../controllers/treeController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for tree

//get all tree
router.get('/',authMiddleware,treeController.findAlltrees);//get all tree
router.get('/all',authMiddleware,treeController.countAllTrees);
//find tree by ID
router.get('/:id',authMiddleware,treeController.findtreebyId);
//find tree by homestead ID
router.get('/home/:id',authMiddleware,treeController.findbuildingbyHomesteadId);
//find tree by ID
router.get('/:id',authMiddleware,treeController.findtreebyId);
//Add new tree
router.post('/',authMiddleware,treeController.addtree);
//delete tree
router.delete('/:id',authMiddleware,treeController.deletetree)
//update tree details
router.put('/:id',authMiddleware,treeController.updatetree)

module.exports = router;