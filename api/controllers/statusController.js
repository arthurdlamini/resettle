const status = require('../models/Status')

module.exports = {
    //find all status
    findAllstatus(req,res){
        status.find().then(data =>  res.json(data)).catch(err =>  res.json(err))
    },
    //find status by id
    findStatusById(req,res){
        const {id} = req.params
        status.findById(id).then(data =>  res.json(data)).catch(err =>  res.json(err))
    },
    //dees status
    deleteStatus(req,res){
        const {id} = req.params
        status.deleteOne({_id:id}).then(data =>  res.json(data)).catch(err =>  res.json(err))
    },
    //deletes all status
    deleteAllStatus(req,res){
        const {id} = req.params
        status.deleteMany({}).then(data =>  res.json(data)).catch(err =>  res.json(err))
    },
    //updates status
    updateStatus(req,res){
        const {id}= req.params
        const {name}=req.body
        status.updateOne({_id:id},{$set:{
            statusName:name
        }}).then(data =>  res.json(data)).catch(err =>  res.json(err))
    },
    //add new status
    addNewStatus(req,res){
        const {name} = req.body
            const newStatus = new status({
            statusName:name
        })
        newStatus.save().then(data =>  {
            message=JSON.stringify(data)
            //send email
            res.json(data)}).catch(err =>  res.json(err.message))
    }
    
}