const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graveSchema = mongoose.Schema(
	{
		
		unitName: {
			type: String,
			required:true
		},
	},
	{
		timestamps: true,
	}
);
const Unit = mongoose.model('Unit', graveSchema);
module.exports = Unit;
