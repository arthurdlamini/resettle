const  express = require('express');
const router = express.Router();
const structureController = require("../controllers/structureController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for structure

//get all structure
router.get('/',authMiddleware,structureController.findAllstructures);
//find structure by ID
router.get('/:id',authMiddleware,structureController.findstructurebyId);
//find structure by homestead ID
router.get('/home/:id',authMiddleware,structureController.findstructurebyHomesteadId);
//find structure by ID
router.get('/:id',authMiddleware,structureController.findstructurebyId);
//Add new structure
router.post('/',authMiddleware,structureController.addstructure);
//delete structure
router.delete('/:id',authMiddleware,structureController.deletestructure)
//update structure details
router.put('/:id',authMiddleware,structureController.updatestructure)

module.exports = router;