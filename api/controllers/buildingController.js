const building = require('../models/Building');

module.exports = {
	//Adding building

	addbuilding(req, res) {
		const {
			homesteadID,
			roof,
			condition,
			walls,
			windows,
			images,
			notes,
			length,
			width,
			area,
			doors,
			floor,
			incomplete
		} = req.body;
		//find if building already added
		const newbuilding = new building({
			homesteadID,
			roof,
			condition,
			walls,
			windows,
			images,
			notes,
			length,
			width,
			area, doors,
			floor,
			incomplete
		});
		//save new building
		return newbuilding
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find All buildings
	findAllbuildings(req, res) {
		building
			.find().populate({
				path: 'homesteadID',
				populate: {
					path: 'homesteadHead',
					model: 'Person', // Replace with the actual model name
				},
			})
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},//count
	countAllBuildings(req, res) {
		building
			.find()
			.count()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//deletes building
	deletebuilding(req, res) {
		const { id } = req.params;
		building
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates building
	updatebuilding(req, res) {
		const { id } = req.params;
		const {
			homesteadID,
			roof,
			condition,
			walls,
			windows,
			images,
			notes,
			length,
			width,
			area, doors,
			floor,relocated,
			incomplete
		} = req.body;

		//change building name
		building
			.updateOne(
				{ _id: id },
				{
					$set: {
						homesteadID,
						roof,
						condition,
						walls,
						windows,
						images,
						notes,
						length,relocated,
						width,
						area, doors,
						floor,
						incomplete
					},
				}
			)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find building by id
	findbuildingbyId(req, res) {
		const { id } = req.params;
		building
			.findById(id).populate({
				path: 'homesteadID',
				populate: {
					path: 'homesteadHead',
					model: 'Person', // Replace with the actual model name
				},
			})
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find building by homestead id
	findbuildingbyHomesteadId(req, res) {
		const { id } = req.params;
		building
			.find({ homesteadID: id })
			.populate('homesteadID')
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},//Count relocated buildings
	countAllRelocatedBuildings(req, res) {
		building
			.find({ relocated: true })
			.countDocuments()
			.exec(function (err, data) {
				res.json(data);
			});
	},//Count not relocated buildings
	countAllNotRelocatedBuildings(req, res) {
		building
			.find({ relocated: false })
			.countDocuments()
			.exec(function (err, data) {
				res.json(data);
			});
	},
};
