const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		role: {
			type: Schema.Types.ObjectId,
			ref: 'Roles',
		},
		isActive: {
			type: Boolean,
			default:false
		},
		isEnabled:{
			type:Boolean,
			default:false
		}
	},
	{
		timestamps: true,
	}
);
const Admin = mongoose.model('User', UserSchema);
module.exports = Admin;
