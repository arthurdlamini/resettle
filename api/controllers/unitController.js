const unit = require('../models/Unit');

module.exports = {
	//Adding unit

	async addunit(req, res) {
		const { unitName, } = req.body;
        //check if unit exist
		const un = await unit.findOne({unitName:unitName})
		if(un){
			
			return res.json({
				message:"Unit already added"
			})
		}

		//add unit
		const newunit = new unit({
			unitName
		});
		//save new unit
		return newunit
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find All units
	findAllunits(req, res) {
		unit
			.find()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//deletes unit
	deleteunit(req, res) {
		const { id } = req.params;
		unit
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates unit
	updateunit(req, res) {
		const { id } = req.params;
		// console.log(req.body)
		const { unitName, } = req.body;
		//change unit name
					unit
						.updateOne(
							{ _id: id },
							{
								$set: {
									unitName, 
								},
							}
						)
						.then((data) => res.json(data))
						.catch((err) => res.json(err));

	},
	//find unit by id
	findunitbyId(req, res) {
		const { id } = req.params;
		unit
			.findById(id)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find unit by homestead id
	
	//Count
	countAllunits(req, res) {
		unit
			.find()
			.count()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	
	},
};
