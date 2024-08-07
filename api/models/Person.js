const mongoose = require('mongoose');


const personSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		IDNo: {
			type: String,
		},
		phone: {
			type: String,
			required: true,
		},gender: {
			type: String,
		},role: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
