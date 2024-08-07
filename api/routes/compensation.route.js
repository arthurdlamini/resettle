const  express = require('express');
const router = express.Router();
const compensationController = require("../controllers/compensationController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for compansation

//get all compansation
router.get('/',compensationController.findAllcompansations);

//count all compansations
router.get('/all',compensationController.countAllcompansations);

//find compansation by ID
router.get('/:id',compensationController.findcompansationbyId);

//find compansation by ID

router.get('/home/:id',compensationController.findcompensationbyHomesteadId);

//Add new compansation
router.post('/',compensationController.addcompansation);

//delete compansation
router.delete('/:id',compensationController.deletecompansation)

//update compansation details
router.put('/:id',compensationController.updatecompansation)

module.exports = router;