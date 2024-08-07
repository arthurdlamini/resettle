const field = require("../models/Field");

module.exports = {
  //Adding field
  addfield(req, res) {
    const { homesteadId, images, width, length, area } = req.body;
    //add field
    const newfield = new field({
      homesteadId,
      images,
      width,
      length,
      area,
    });
    //save new field
    return newfield
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find All fields
  findAllfields(req, res) {
    field
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
  //deletes field
  deletefield(req, res) {
    const { id } = req.params;
    field
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //updates field
  updatefield(req, res) {
    const { id } = req.params;
    const { homesteadId, images, width, length, area,relocated } = req.body;
    //CHECK IF NAME ALREADY EXIST

    //change field name
    field
      .updateOne(
        { _id: id },
        {
          $set: {
            homesteadId,
            images,
            width,
            length,
            area,relocated
          },
        }
      )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //find field by id
  findfieldbyId(req, res) {
    const { id } = req.params;
    field
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
  //find field by homestead id
  findbuildingbyHomesteadId(req, res) {
    const { id } = req.params;
    field
      .find({ homesteadId: id })
      .populate("homesteadId")
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
};
