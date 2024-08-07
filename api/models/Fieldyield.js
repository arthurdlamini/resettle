const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fieldyieldSchema = mongoose.Schema(
	{
		fieldId: {
			type: Schema.Types.ObjectId,
			ref: 'Field',
			 required: true,
		},
		images: [
			{
				filename: { type: String, required: true }, // File name
				public_id: { type: String },
				secure_url: { type: String },
			},
		],
		croptype: {
			type: String,
			// required: true,
		},priceperton: {
			type: Number,
			// required: true,
		},costperhectare: {
			type: Number,
			// required: true,
		},yieldperhectare: {
			
			type: Number,
			// required: true,
		},totalcost: {
			type: Number,
			// required: true,
		},grossmargin: {
			type: Number,
			// required: true,
		},relocated: {
			type: Boolean,
			default:false
		},
	},
	{
		timestamps: true,
	}
);
const FieldYield = mongoose.model('FieldYield', fieldyieldSchema);
module.exports = FieldYield;
