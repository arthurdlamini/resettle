const  express = require('express');
const router = express.Router();
const graveController = require("../controllers/graveController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for grave

//get all grave
router.get('/',authMiddleware,graveController.findAllgraves);
//count all graves
router.get('/all',authMiddleware,graveController.countAllgraves);

//get all graves relocated
router.get('/relocated',authMiddleware,graveController.countAllRelocatedGraves)
//get all graves for the ast five months
router.get('/notrelocated',authMiddleware,graveController.countAllNotRelocatedGraves)
//find grave by ID
router.get('/:id',authMiddleware,graveController.findgravebyId);
//find grave by homestead ID
router.get('/home/:id',authMiddleware,graveController.findbuildingbyHomesteadId);
//find grave by ID
router.get('/:id',authMiddleware,graveController.findgravebyId);
//Add new grave
router.post('/',authMiddleware,graveController.addgrave);
//delete grave
router.delete('/:id',authMiddleware,graveController.deletegrave)
//update grave details
router.put('/:id',authMiddleware,graveController.updategrave)

module.exports = router;