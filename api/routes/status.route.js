const express = require('express');
const router = express.Router()
const statusController = require('../controllers/statusController')

const {isAdmin,authMiddleware} = require('../middleware/authMiddleware');
//get all status
router.get('/',authMiddleware,statusController.findAllstatus)
//get status by id
router.get('/:id',authMiddleware,statusController.findStatusById)
//add Status
router.post('/',authMiddleware,isAdmin,statusController.addNewStatus);
//modify status
router.put('/:id',authMiddleware,isAdmin,statusController.updateStatus);
//remove status
router.delete('/:id',authMiddleware,isAdmin,statusController.deleteStatus)
//remove all status
router.delete('/',authMiddleware,isAdmin,statusController.deleteAllStatus)
module.exports = router;