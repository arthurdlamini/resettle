const person = require('../models/Person');

module.exports = {
	//Adding person
   
	addperson(req, res) {
		const { IDNo, name, phone,gender,role } = req.body;
		//find if person already added
		person
			.findOne({ IDNo: IDNo })
			.then((data) => {
				if (data)
					return res.json({
						msg: `${name} Already added..`,
					});
				else {
					const newperson = new person({
						IDNo: IDNo,
						name,
						phone,
                        gender,
                        role
					});
					//save new person
					return newperson
						.save()
						.then((data) => res.json(data))
						.catch((err) => res.json(data));
				}
			})
			.catch((err) => res.json(err.message));
	},
	//find All persons
	findAllpersons(req, res) {
		person
			.find()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//deletes person
	deleteperson(req, res) {
		const { id } = req.params;
		person
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates person
	updateperson(req, res) {
		const { id } = req.params;
		const { name, phone, IDNo, } = req.body;
		//CHECK IF NAME ALREADY EXIST
		person
			.findOne({ IDNo: id })
			.then((data) => {
				if (data)
					return res.json({
						msg: `${name} Already Exists ...Plz Try another one`,
					});
				else {
					//change person name
					person
						.updateOne(
							{ _id: id },
							{
								$set: {
									name: name,
									phone: phone,
									IDNo: IDNo,

								},
							}
						)
						.then((data) => res.json(data))
						.catch((err) => res.json(err));
				}
			})
			.catch((err) => res.json(err.message));
	},
	//find person by id
	findpersonbyId(req, res) {
		const { id } = req.params;
		person
			.findById(id)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
};
