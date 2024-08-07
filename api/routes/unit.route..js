const  express = require('express');
const router = express.Router();
const unitController = require("../controllers/unitController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for unit

//get all unit
router.get('/',unitController.findAllunits);
//count all units
router.get('/all',unitController.countAllunits);

//find unit by ID
router.get('/:id',unitController.findunitbyId);
//find unit by homestead ID
//find unit by ID
router.get('/:id',unitController.findunitbyId);
//Add new unit
router.post('/',unitController.addunit);
//delete unit
router.delete('/:id',unitController.deleteunit)
//update unit details
router.put('/:id',unitController.updateunit)

module.exports = router;