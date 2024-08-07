const mongoose = require('mongoose');
const userRolesSchema = mongoose.Schema(
	{
		role: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const UserRoles = mongoose.model('Roles', userRolesSchema);
module.exports = UserRoles;
