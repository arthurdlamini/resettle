const tree = require('../models/Tree');

module.exports = {
	//Adding tree
	addtree(req, res) {
		const { homesteadId, images, condition, type, size, number } = req.body;
		//add tree
		const newtree = new tree({
			homesteadId, images, condition, type, size, number
		});
		//save new tree
		return newtree
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},//count
	countAllTrees(req, res) {
		tree
			.find()
			.count()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find All trees
	findAlltrees(req, res) {
		tree
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
	//deletes tree
	deletetree(req, res) {
		const { id } = req.params;
		tree
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates tree
	updatetree(req, res) {
		const { id } = req.params;
		const { homesteadId, images, condition, type, size, number,relocated } = req.body;
		//change tree name
		tree
			.updateOne(
				{ _id: id },
				{
					$set: {
						homesteadId, images, condition, type, size, number,relocated
					},
				}
			)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));

	},
	//find tree by id
	findtreebyId(req, res) {
		const { id } = req.params;
		tree
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
	//find tree by homestead id
	findbuildingbyHomesteadId(req, res) {
		const { id } = req.params;
		tree
			.find({ homesteadId: id })
			.populate('homesteadId')
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
};
