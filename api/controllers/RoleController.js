const userRoles = require('../models/Role');

module.exports = {
	//adding a role
	addRole(req, res) {
		
		const { role } = req.body;
		const newRole = new userRoles({
			role: role,
		});
		newRole
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err.message));
			
	},
	//find all roles
	findRoles(req, res) {
		userRoles
			.find()
			.then((data) => {
				if (data) {
					return res.json(data);
				}
				res.json({ msg: 'No roles available' });
			})
			.catch((err) => res.json(err.message));
	},
	//find role by ID
	findRoleById(req, res) {
		const { id } = req.params;
		userRoles
			.findById(id)
			.then((data) => res.json(data))
			.catch((err) => res.json(err.message));
	},
	//delete role

	deleteRole(req, res) {
		const { id } = req.params;
		userRoles
			.deleteOne({_id:id})
			.then((data) => {
				if (data) {
					return res.json(data);
				}
				res.json({ msg: 'Could not find that role' });
			})
			.catch((err) => res.json(err.message));
	},
	//update role
	updateRole(req, res) {
		const { id, role } = req.body;
		userRoles
			.updateOne(
				{ _id: id },
				{
					$set: {
						role: role,
					},
				}
			)
			.then((data) => res.json(data))
			.catch((err) => res.json(data));
	},
};
