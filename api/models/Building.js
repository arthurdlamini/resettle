const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BuildingSchema = mongoose.Schema(
	{
		homesteadID: {
			type: Schema.Types.ObjectId,
			ref: 'Homestead',
			// required: true,
		},
		roof: {
			type: String,
		},
		condition: {
			type: String,
		},
		walls: {
			type: String,
		},
		windows: {
			type: String,
		},
		images: [
			{
				filename: { type: String, required: true }, // File name
				public_id: { type: String },
				secure_url: { type: String },
			},
		],
		notes: {
			type: String,
		},
		length: {
			type: Number,
		},
		width: {
			type: Number,
		},
		area: {
			type: Number,
		}, doors: {
			type: Number,
		}, floor: {
			type: String,
		}, incomplete: {
			type: Boolean,
		},relocated: {
			type: Boolean,
			default:false
		},
	},
	{
		timestamps: true,
	}
);
const Building = mongoose.model('Building', BuildingSchema);
module.exports = Building;
