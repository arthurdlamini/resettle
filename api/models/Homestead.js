const mongoose = require("mongoose");
const intervantion = require("./Intervention");
const Schema = mongoose.Schema;
const homesteadSchema = mongoose.Schema(
  {
    homesteadHead: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      // required: true,
    },
    size: {
      type: String,
    },
    southing: {
      type: Number,
    },
    easting: {
      type: Number,
    },
    images: [
      {
        filename: { type: String, required: true }, // File name
        public_id: { type: String },
        secure_url: { type: String },
      },
    ],

    location: {
      type: String,
      required: true,
    },
    relocated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Homestead = mongoose.model("Homestead", homesteadSchema);
module.exports = Homestead;
