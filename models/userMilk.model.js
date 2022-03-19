var mongoose = require("mongoose");

const userMilkSchema = new mongoose.Schema(
  {
    totalMilk: { type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    returnedMilk: { type: Number },
    regDate: { type: Date, default: Date.now() }
  },
  { collection: "usermilk" }
);

const UserMilk = mongoose.model("usermilk", userMilkSchema); //"usermilk" is collection name

module.exports = UserMilk;
