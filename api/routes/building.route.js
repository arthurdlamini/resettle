const  express = require('express');
const router = express.Router();
const buildingController = require("../controllers/buildingController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for building

//get all building
router.get('/',authMiddleware,buildingController.findAllbuildings);

//get all building relocated
router.get('/relocated',authMiddleware,buildingController.countAllRelocatedBuildings)
//get all building for the ast five months
router.get('/notrelocated',authMiddleware,buildingController.countAllNotRelocatedBuildings)
//count all building
router.get('/all',authMiddleware,buildingController.countAllBuildings);
//find building by ID
router.get('/:id',authMiddleware,buildingController.findbuildingbyId);
//find building by homestead ID
router.get('/home/:id',authMiddleware,buildingController.findbuildingbyHomesteadId);
//find building by ID
router.get('/:id',authMiddleware,buildingController.findbuildingbyId);
//Add new building
router.post('/',authMiddleware,buildingController.addbuilding);
//delete building
router.delete('/:id',authMiddleware,buildingController.deletebuilding)
//update building details
router.put('/:id',authMiddleware,buildingController.updatebuilding)

module.exports = router;