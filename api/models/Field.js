const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fieldSchema = mongoose.Schema(
	{
		homesteadId: {
			type: Schema.Types.ObjectId,
			ref: 'Homestead',
			 required: true,
		},
		images: [
			{
				filename: { type: String, required: true }, // File name
				public_id: { type: String },
				secure_url: { type: String },
			},
		],
		length: {
			type: Number,
			// required: true,
		},
		area: {
			type: Number,
			// required: true,
		}, 
		width: {
			type: Number,
			// required: true,
		},relocated: {
			type: Boolean,
			default:false
		},
		// croptype: {
		// 	type: String,
		// 	// required: true,
		// },priceperton: {
		// 	type: Number,
		// 	// required: true,
		// },costperhectare: {
		// 	type: Number,
		// 	// required: true,
		// },yieldperhectare: {
		// 	type: Number,
		// 	// required: true,
		// },totalcost: {
		// 	type: Number,
		// 	// required: true,
		// },grossmargin: {
		// 	type: Number,
		// 	// required: true,
		// },
	},
	{
		timestamps: true,
	}
);
const Field = mongoose.model('Field', fieldSchema);
module.exports = Field;
