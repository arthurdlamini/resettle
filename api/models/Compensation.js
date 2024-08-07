const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const compensationSchema = mongoose.Schema(
  {
    homesteadId: {
      type: Schema.Types.ObjectId,
      ref: "Homestead",
      required: true,
    },
    intervantionId: {
      type: Schema.Types.ObjectId,
      ref: "Intervention",
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Compensation = mongoose.model("Compensation", compensationSchema);
module.exports = Compensation;
