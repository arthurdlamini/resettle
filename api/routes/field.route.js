const  express = require('express');
const router = express.Router();
const fieldController = require("../controllers/fieldController")
const fieldyieldController = require("../controllers/fieldYieldController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for field

//get all field
router.get('/',fieldController.findAllfields);
//find field by ID
router.get('/:id',fieldController.findfieldbyId);
//find field by homestead ID
router.get('/home/:id',fieldController.findbuildingbyHomesteadId);
//find field by ID
router.get('/:id',fieldController.findfieldbyId);
//Add new field
router.post('/',fieldController.addfield);
//delete field
router.delete('/:id',fieldController.deletefield)
//update field details
router.put('/:id',fieldController.updatefield)
//update field details
router.put('/:id',fieldController.updatefield)


// Routes for field yield

//get all field
router.get('/',authMiddleware,fieldyieldController.findAllfieldyields);
//find field by ID
router.get('/:id',authMiddleware,fieldyieldController.findfieldyieldbyId);
//find field by Filed ID
router.get('/yield/field/:id',authMiddleware,fieldyieldController.findbuildingbyHomesteadId);
//deletefield by Filed ID
router.delete('/yield/field/:id',authMiddleware,fieldyieldController.deletefieldyield);
//Add new field
router.post('/yield/:id',authMiddleware,fieldyieldController.addfieldyield);
//delete field
router.delete('/:id',authMiddleware,fieldyieldController.deletefieldyield)
//update field details
router.put('/:id',authMiddleware,fieldyieldController.updatefieldyield)

module.exports = router;