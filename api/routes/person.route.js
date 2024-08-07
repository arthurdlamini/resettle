const  express = require('express');
const router = express.Router();
const personController = require("../controllers/personController")

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');

// Routes for Person

//get all person
router.get('/',authMiddleware,personController.findAllpersons);
//find person by ID
router.get('/:id',authMiddleware,personController.findpersonbyId);
//Add new person
router.post('/',authMiddleware,personController.addperson);
//delete person
router.delete('/:id',authMiddleware,personController.deleteperson)
//update person details
router.put('/:id',authMiddleware,personController.updateperson)

module.exports = router;