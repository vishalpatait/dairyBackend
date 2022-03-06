var mongoose = require("mongoose");

const milktypeSchema = new mongoose.Schema(
    {
        Milktype: { type: String },

        Price: { type: String },

        regDate: { type: Date, default: Date.now() }
    },
    { collection: "Milktype" }
);

const Milktype = mongoose.model("Milktype", milktypeSchema); //"Milktype" is collection name

module.exports = Milktype;
