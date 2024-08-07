const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const structureSchema = mongoose.Schema(
	{
		homesteadID: {
			type: Schema.Types.ObjectId,
			ref: 'Homestead',
			// required: true,
		},
		type: {
			type: String,
		},
		replaced: {
			type: Boolean,
			default: false
		},
		condition: {
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
		}, number: {
			type: Number,
		},
		runningM: {
			type: Number,
		},relocated: {
			type: Boolean,
			default:false
		},
	},
	{
		timestamps: true,
	}
);
const Structure = mongoose.model('Structure', structureSchema);
module.exports = Structure;
