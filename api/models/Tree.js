const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const treeSchema = mongoose.Schema(
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
		size: {
			type: String,
			// required: true,
		},
		type: {
			type: String,
			// required: true,
		},
		condition: {
			type: String,
			// required: true,
		},
		number: {
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
const Tree = mongoose.model('Tree', treeSchema);
module.exports = Tree;
