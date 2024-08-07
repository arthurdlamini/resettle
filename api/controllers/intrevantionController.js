const intervention = require('../models/Intervention');

module.exports = {
	//Adding intervention

	async addintervention(req, res) {
		const { type,  } = req.body;



		 //check if unit exist
		 const un = await intervention.findOne({type:type})
		 if(un){
			 
			 return res.json({
				 message:"Data already added"
			 })
		 }
		//add intervention
		const newintervention = new intervention({
			type,
		});
		//save new intervention
		return newintervention
			.save()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//find All interventions
	findAllinterventions(req, res) {
		intervention
			.find()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//deletes intervention
	deleteintervention(req, res) {
		const { id } = req.params;
		intervention
			.deleteOne({ _id: id })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	//updates intervention
	updateintervention(req, res) {
		const { id } = req.params;
		// console.log(req.body)
		const { type, } = req.body;
		//change intervention name
					intervention
						.updateOne(
							{ _id: id },
							{
								$set: {
									type, 
								},
							}
						)
						.then((data) => res.json(data))
						.catch((err) => res.json(err));

	},
	//find intervention by id
	findinterventionbyId(req, res) {
		const { id } = req.params;
		intervention
			.findById(id)
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
	
	//Count
	countAllinterventions(req, res) {
		intervention
			.find()
			.count()
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	},
};
