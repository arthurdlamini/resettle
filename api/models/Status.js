const mongoose = require('mongoose')
const statusSchema = mongoose.Schema({
    statusName:{
        type:String,
        required:true,
        unique:true,
    }
},{
    timestamps:true
});
const Status = mongoose.model('Status',statusSchema);
module.exports=Status;