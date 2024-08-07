const structure = require('../models/Structure');

module.exports = {
	//Adding structure

	addstructure(req, res) {
		const {
			homesteadID,
			type,
			condition,
			images,
			notes,
			length,
			width,
			area, number, runningM
		} = req.body;
		//find if structure already added
		const newstructure = new structure({
			homesteadID,
			type,
			condition,
			images,
			notes,
			length,
			width,
			area, runningM, number
		});
		//save new structure
		return newstructure
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find All structures
	findAllstructures(req, res) {
		structure
			.find().populate({
				path: 'homesteadID',
				populate: {
					path: 'homesteadHead',
					model: 'Person', // Replace with the actual model name
				},
			})
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//deletes structure
	deletestructure(req, res) {
		const { id } = req.params;
		structure
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates structure
	updatestructure(req, res) {
		const { id } = req.params;
		const {
			homesteadID,
			type,
			condition,
			images,
			notes,
			length,
			width,
			replaced,
			area, runningM, number,relocated
		} = req.body;;

		//change structure name
		structure
			.updateOne(
				{ _id: id },
				{
					$set: {
						homesteadID,
						type,
						condition,
						images,
						notes,
						length,
						width,
						area, runningM, number,replaced,relocated
					},
				}
			)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find structure by id
	findstructurebyId(req, res) {
		const { id } = req.params;
		structure
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
	//find structure by homestead id
	findstructurebyHomesteadId(req, res) {
		const { id } = req.params;
		structure
			.find({ homesteadID: id })
			.populate('homesteadID')
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
};
