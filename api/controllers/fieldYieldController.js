const fieldyield = require("../models/Fieldyield");

module.exports = {
  //Adding fieldyield
  addfieldyield(req, res) {
    
    const {
      fieldId,
      images,
      croptype,
      priceperton,
      costperhectare,
      yieldperhectare,
      totalcost,
      grossmargin,
    } = req.body;
    //add fieldyield
    const newfieldyield = new fieldyield({
      fieldId,
      images,
      croptype,
      priceperton,
      costperhectare,
      yieldperhectare,
      totalcost,
      grossmargin,
    });
    //save new fieldyield
    return newfieldyield
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find All fieldyields
  findAllfieldyields(req, res) {
    fieldyield
      .find()
      .populate({
        path: "homesteadId",
        populate: {
          path: "homesteadHead",
          model: "Person", // Replace with the actual model name
        },
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //deletes fieldyield
  deletefieldyield(req, res) {
    const { id } = req.params;
    fieldyield
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //updates fieldyield
  updatefieldyield(req, res) {
    const { id } = req.params;
    const {
      fieldId,
      images,
      croptype,
      priceperton,
      costperhectare,
      yieldperhectare,
      totalcost,relocated,
      grossmargin,
    } = req.body;
    //CHECK IF NAME ALREADY EXIST

    //change fieldyield name
    fieldyield
      .updateOne(
        { _id: id },
        {
          $set: {
            fieldId,
            images,
            croptype,
            priceperton,
            costperhectare,
            yieldperhectare,
            totalcost,
            grossmargin,relocated
          },
        }
      )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find fieldyield by id
  findfieldyieldbyId(req, res) {
    const { id } = req.params;
    fieldyield
      .findById(id)
      .populate({
        path: "homesteadId",
        populate: {
          path: "homesteadHead",
          model: "Person", // Replace with the actual model name
        },
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find fieldyield by homestead id
  findbuildingbyHomesteadId(req, res) {
    const { id } = req.params;
    fieldyield
      .find({ fieldId: id })
      .populate("fieldId")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
};
