var mongoose = require("mongoose");

const customerMilkSchema = new mongoose.Schema(
  {
    quantity: { type: Number },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },

    regDate: { type: Date, default: Date.now() }
  },
  { collection: "customermilk" }
);

const CustomerMilk = mongoose.model("customermilk", customerMilkSchema); //"CustomerMilk" is collection name

module.exports = CustomerMilk;
