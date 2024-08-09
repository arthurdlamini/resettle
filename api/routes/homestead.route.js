const  express = require('express');
const router = express.Router();
const homesteadController = require("../controllers/homesteadController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for homestead

//get all homestead

//get recent homesteads
router.get('/recentHomes',authMiddleware,homesteadController.recentAllHomesteads)
//get all homesteads for the ast five months
router.get('/fivemonths',authMiddleware,homesteadController.getAllHomesteadFiveMonths)
//get all homesteads relocated
router.get('/relocated',authMiddleware,homesteadController.countAllRelocatedHomes)
//get all homesteads for the ast five months
router.get('/notrelocated',authMiddleware,homesteadController.countAllNotRelocatedHomes)

//get homestead by location
router.get('/bylocation',homesteadController.countHomesteadsByLocation)

//get homestead by location
router.get('/byrelocation',homesteadController.countHomesteadsByRelocationStatus)

//get homestead all report
router.get('/allreport',homesteadController.homesteadsreport)

//get homestead single report
router.get('/singlereport/:id',homesteadController.singlehomesteadreport)

//count all homesteads
router.get('/all',authMiddleware,homesteadController.countAllhomesteads)

//Get homesteads router reports
router.get('/report',homesteadController.gethomesteadReport)

router.get('/',homesteadController.findAllhomesteads);

//find homestead by ID
router.get('/:id',authMiddleware,homesteadController.findhomesteadbyId);
//Add new homestead
router.post('/',authMiddleware,homesteadController.addhomestead);
//delete homestead
router.delete('/:id',authMiddleware,homesteadController.deletehomestead)
//update homestead details
router.put('/:id',authMiddleware,homesteadController.updatehomestead)

module.exports = router;