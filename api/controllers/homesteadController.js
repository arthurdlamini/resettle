const Homestead = require('../models/Homestead');
const homestead = require('../models/Homestead');
const moment = require('moment');
const Person = require('../models/Person');
const mongoose = require("mongoose");
//reverse object
function dict_reverse(obj) {
	new_obj = {};
	rev_obj = Object.keys(obj).reverse();
	rev_obj.forEach(function (i) {
		new_obj[i] = obj[i];
	});
	return new_obj;
}
module.exports = {
	//Adding homestead

	addhomestead(req, res) {
		console.log(req.body)
		const { homesteadHead, images, location, southing, easting } = req.body;
		//find if homestead already added
		const newhomestead = new homestead({
			homesteadHead,
			images,
			location,
			southing,
			easting
		});
		//save new homestead
		return newhomestead
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find All homesteads
	findAllhomesteads(req, res) {
		homestead
			.find()
			.populate('homesteadHead')
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},//count
	countAllhomesteads(req, res) {
		homestead
			.find()
			.count()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},//Count all homesteads this f0ive months
	async getAllHomesteadFiveMonths(req, res) {
		try {
			const currentMonth = moment().month();
			const itemCounts = {};

			// Iterate over the past five months (including the current one)
			for (let i = 0; i < 6; i++) {
				const month = moment().subtract(i, 'months').month();
				const monthName = moment().month(month).format('MMMM');

				// Calculate the start and end of the month
				const startOfMonth = moment().month(month).startOf('month');
				const endOfMonth = moment().month(month).endOf('month');

				// Query the database to count the items created in the current month
				const count = await homestead.countDocuments({
					createdAt: {
						$gte: startOfMonth.toDate(),
						$lte: endOfMonth.toDate(),
					},
				});

				// Store the count in the itemCounts object
				itemCounts[monthName] = count;
			}
			//reverse the months to start by latest month
			rev = dict_reverse(itemCounts);
			const formattedData = Object.entries(rev).map(([month, value]) => ({
				month: month,
				value: value,
			}));
			res.json(formattedData); // Output the item counts by month
		} catch (err) {
			console.error('Error calculating item count by month:', err);
		}
	},//Count relocated homesteads
	countAllRelocatedHomes(req, res) {
		homestead
			.find({ relocated: true })
			.countDocuments()
			.exec(function (err, data) {
				res.json(data);
			});
	},//Count not relocated homesteads
	countAllNotRelocatedHomes(req, res) {
		homestead
			.find({ relocated: false })
			.countDocuments()
			.exec(function (err, data) {
				res.json(data);
			});
	},
	//deletes homestead
	deletehomestead(req, res) {
		const { id } = req.params;
		homestead
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates homestead
	updatehomestead(req, res) {
		const { id } = req.params;
		const { homesteadHead, images, location, southing, easting, relocated } = req.body;
		//CHECK IF NAME ALREADY EXIST
		homestead

		//change homestead name
		homestead
			.updateOne(
				{ _id: id },
				{
					$set: {
						homesteadHead, images, location, southing, easting, relocated
					},
				}
			)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));

	},
	//find homestead by id
	findhomesteadbyId(req, res) {
		const { id } = req.params;
		homestead
			.findById(id).populate('homesteadHead')
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},//Get all recent homesteads
	recentAllHomesteads(req, res) {


		let d = new Date();
		let n = d.getFullYear();
		let m = d.getMonth();

		homestead
			.find()
			.sort({ $natural: -1 })
			.limit(3)
			.populate('homesteadHead')
			.exec((err, data) => {
				if (err) return res.json(err);
				res.json(data);
			});
	}, async gethomesteadReport(req, res) {
		let homesteads = await Homestead.find().populate('homesteadHead')
		console.log(homesteads)

	},
	async countHomesteadsByLocation(req, res) {


		try {
			const result = await homestead.aggregate([
				{
					'$group': {
						'_id': '$location',
						'count': {
							'$sum': 1
						}
					}
				}
			])

			// Format the result
			const response = result.map((obj) => {
				return {
					total: obj.count,
					location: obj._id,
				};
			});

			res.json(response);
		} catch (error) {
			console.log(error)
		}

	},
	async countHomesteadsByRelocationStatus(req, res) {


		try {
			const result = await homestead.aggregate([
				{
					'$group': {
						'_id': '$relocated',
						'count': {
							'$sum': 1
						}
					}
				}
			])

			// Format the result
			const response = result.map((obj) => {
				return {
					total: obj.count,

					relocated: obj._id,
				};
			});

			res.json(response);
		} catch (error) {
			console.log(error)
		}

	},
	async homesteadsreport(req, res) {


		try {
			const result = await homestead.aggregate([

				{
					$lookup: {
						from: "buildings",
						localField: "_id",
						foreignField: "homesteadID",
						as: "buildings",
					},
				},
				{
					$lookup: {
						from: "compensations",
						localField: "_id",
						foreignField: "homesteadId",
						as: "compensations",
					},
				},
				{
					$lookup: {
						from: "fields",
						localField: "_id",
						foreignField: "homesteadId",
						as: "fields",
					},
				},
				{
					$lookup: {
						from: "graves",
						localField: "_id",
						foreignField: "homesteadId",
						as: "graves",
					},
				},
				{
					$lookup: {
						from: "structures",
						localField: "_id",
						foreignField: "homesteadID",
						as: "structures",
					},
				},
				{
					$lookup: {
						from: "trees",
						localField: "_id",
						foreignField: "homesteadId",
						as: "trees",
					},
				},
				{
					$lookup: {
						from: "people",
						localField: "homesteadHead",
						foreignField: "_id",
						as: "owner_details",
					},
				},

				{
					$addFields: {
						owner_details: {
							$arrayElemAt: ["$owner_details", 0],
						},
					},
				},
				{
					$addFields: {
						numberOfGraves: {
							$size: {
								$ifNull: ["$graves", []],
							},
						},
						numberOfTrees: {
							$size: {
								$ifNull: ["$trees", []],
							},
						},
						numberOfBuildings: {
							$size: {
								$ifNull: ["$buildings", []],
							},
						},
						numberOfStructures: {
							$size: {
								$ifNull: ["$structures", []],
							},
						},
						numberOfGraves: {
							$size: {
								$ifNull: ["$graves", []],
							},
						},
						numberOfFields: {
							$size: {
								$ifNull: ["$fields", []],
							},
						},
						owners_name: "$owner_details.name",
						owners_ID: "$owner_details.IDNo",
						owners_phone: "$owner_details.phone",
					},
				},
				{
					$project:
					{
						homesteadHead: 0,
						images: 0,
						updatedAt: 0,
						__v: 0,
						structures: 0,
						graves: 0,
						buildings: 0,
						trees: 0,
						owner_details: 0,
						_id: 0,
					},
				},

			])

			res.json(result);
		} catch (error) {
			res.status()
			console.log(error)
		}

	}, async singlehomesteadreport(req, res) {


		const { id } = req.params;

		let d = mongoose.Types.ObjectId(id)
		try {
			const result = await homestead.aggregate([
				{
					$match: {
						_id: d,
					},
				},


				{
					$lookup: {
						from: "buildings",
						localField: "_id",
						foreignField: "homesteadID",
						as: "buildings",
					},
				},
				{
					$lookup: {
						from: "compensations",
						localField: "_id",
						foreignField: "homesteadId",
						as: "compensations",
					},
				},
				{
					$lookup: {
						from: "fields",
						localField: "_id",
						foreignField: "homesteadId",
						as: "fields",
					},
				},
				{
					$lookup: {
						from: "graves",
						localField: "_id",
						foreignField: "homesteadId",
						as: "graves",
					},
				},
				{
					$lookup: {
						from: "structures",
						localField: "_id",
						foreignField: "homesteadID",
						as: "structures",
					},
				},
				{
					$lookup: {
						from: "trees",
						localField: "_id",
						foreignField: "homesteadId",
						as: "trees",
					},
				},
				{
					$lookup: {
						from: "people",
						localField: "homesteadHead",
						foreignField: "_id",
						as: "owner_details",
					},
				},
				{
					$addFields: {
						owner_details: {
							$arrayElemAt: ["$owner_details", 0],
						},
					},
				},
				{
					$addFields: {
						numberOfGraves: {
							$size: {
								$ifNull: ["$graves", []],
							},
						},
						numberOfTrees: {
							$size: {
								$ifNull: ["$trees", []],
							},
						},
						numberOfBuildings: {
							$size: {
								$ifNull: ["$buildings", []],
							},
						},
						numberOfStructures: {
							$size: {
								$ifNull: ["$structures", []],
							},
						},
						numberOfGraves: {
							$size: {
								$ifNull: ["$graves", []],
							},
						},
						numberOfFields: {
							$size: {
								$ifNull: ["$fields", []],
							},
						},
						owners_name: "$owner_details.name",
						owners_ID: "$owner_details.IDNo",
						owners_phone: "$owner_details.phone",
					},
				},
				{
					$project:
					/**
					 * specifications: The fields to
					 *   include or exclude.
					 */
					{
						homesteadHead: 0,
						images: 0,
						updatedAt: 0,
						__v: 0,
						structures: 0,
						graves: 0,
						buildings: 0,
						trees: 0,
						owner_details: 0,
						_id: 0,
					},
				},

			])
			res.json(result);
		} catch (error) {
			console.log(error)
		}

	}
};
