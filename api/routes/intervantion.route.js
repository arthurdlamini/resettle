const  express = require('express');
const router = express.Router();
const intrevantionController = require("../controllers/intrevantionController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for intervention

//get all intervention
router.get('/',intrevantionController.findAllinterventions);

//count all interventions
router.get('/all',intrevantionController.countAllinterventions);

//find intervention by ID
router.get('/:id',intrevantionController.findinterventionbyId);

//find intervention by ID
router.get('/:id',intrevantionController.findinterventionbyId);

//Add new intervention
router.post('/',intrevantionController.addintervention);

//delete intervention
router.delete('/:id',intrevantionController.deleteintervention)

//update intervention details
router.put('/:id',intrevantionController.updateintervention)

module.exports = router;