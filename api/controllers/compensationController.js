const compansation = require("../models/Compensation");

module.exports = {
  //Adding compansation

  addcompansation(req, res) {
    const { homesteadId, intervantionId, unitId, quantity } = req.body;
    //add compansation
    const newcompansation = new compansation({
      homesteadId,
      intervantionId,
      unitId,
      quantity,
    });
    //save new compansation
    return newcompansation
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find All compansations
  findAllcompansations(req, res) {
    compansation
      .find()
      .populate({
        path: "homesteadId",
        populate: {
          path: "homesteadHead",
          model: "Person",
        },
      })
      .populate("intervantionId")
      .populate("unitId")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //deletes compansation
  deletecompansation(req, res) {
    const { id } = req.params;
    compansation
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //updates compansation
  updatecompansation(req, res) {
    const { id } = req.params;
    // console.log(req.body)
    const { homesteadId, intervantionId, unitId, quantity } = req.body;
    //change compansation name
    compansation
      .updateOne(
        { _id: id },
        {
          $set: {
            homesteadId,
            intervantionId,
            unitId,
            quantity,
          },
        }
      )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find compansation by id
  findcompansationbyId(req, res) {
    const { id } = req.params;
    compansation
      .findById(id)
      .populate({
        path: "homesteadId",
        populate: {
          path: "homesteadHead",
          model: "Person",
        },
      })
      .populate("intervantionId")
      .populate("unitId")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find compansation by homestead id
  findcompensationbyHomesteadId(req, res) {
    const { id } = req.params;
    compansation
      .find({ homesteadId: id })
      .populate({
        path: "homesteadId",
        populate: {
          path: "homesteadHead",
          model: "Person",
        },
      })
      .populate("intervantionId")
      .populate("unitId")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //Count
  countAllcompansations(req, res) {
    compansation
      .find()
      .count()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
};
