const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graveSchema = mongoose.Schema(
	{
		homesteadId: {
			type: Schema.Types.ObjectId,
			ref: 'Homestead',
			// required: true,
		},
		images: [
			{
				filename: { type: String, required: true }, // File name
				public_id: { type: String },
				secure_url: { type: String },
			},
		],
		southing: {
			type: String,
			// required: true,
		},
		easthing: {
			type: String,
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
const Grave = mongoose.model('Grave', graveSchema);
module.exports = Grave;
