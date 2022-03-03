var mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // surname: { type: String, required: true },

    mobile: { type: String },
    email: { type: String },

    // gender: { type: String },

    regDate: { type: Date, default: Date.now() }
  },
  { collection: "Customer" }
);

const Customer = mongoose.model("Customer", customerSchema); //"Customer" is collection name

module.exports = Customer;
