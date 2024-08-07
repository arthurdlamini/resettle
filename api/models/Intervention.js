const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const intervantionSchema = mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const intervantion = mongoose.model('Intervention', intervantionSchema);
module.exports = intervantion;
