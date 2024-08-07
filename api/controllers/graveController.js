const grave = require('../models/Grave');

module.exports = {
	//Adding grave

	addgrave(req, res) {
		const { homesteadId, images, southing, easthing } = req.body;
		//add grave
		const newgrave = new grave({
			homesteadId,
			images,
			southing,
			easthing,
		});
		//save new grave
		return newgrave
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find All graves
	findAllgraves(req, res) {
		grave
			.find().populate({
				path: 'homesteadId',
				populate: {
					path: 'homesteadHead',
					model: 'Person', // Replace with the actual model name
				},
			})
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//deletes grave
	deletegrave(req, res) {
		const { id } = req.params;
		grave
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates grave
	updategrave(req, res) {
		const { id } = req.params;
		// console.log(req.body)
		const { homesteadId, southing, easting,relocated } = req.body;
		//change grave name
					grave
						.updateOne(
							{ _id: id },
							{
								$set: {
									homesteadId, southing, easthing:easting,relocated
								},
							}
						)
						.then((data) => res.json(data))
						.catch((err) => res.json(err));

	},
	//find grave by id
	findgravebyId(req, res) {
		const { id } = req.params;
		grave
			.findById(id).populate({
				path: 'homesteadId',
				populate: {
					path: 'homesteadHead',
					model: 'Person', // Replace with the actual model name
				},
			})
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find grave by homestead id
	findbuildingbyHomesteadId(req, res) {
		const { id } = req.params;
		grave
			.find({ homesteadid: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//Count
	countAllgraves(req, res) {
		grave
			.find()
			.count()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},//Count relocated graves
	countAllRelocatedGraves(req, res) {
		grave
			.find({ relocated: true })
			.countDocuments()
			.exec(function (err, data) {
				res.json(data);
			});
	},//Count not relocated graves
	countAllNotRelocatedGraves(req, res) {
		grave
			.find({ relocated: false })
			.countDocuments()
			.exec(function (err, data) {
				res.json(data);
			});
	},
};
