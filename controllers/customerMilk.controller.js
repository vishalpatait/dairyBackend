const CustomerMilk = require("../models/CustomerMilk.model");

const _ = require("lodash");
class CustomerMilkCtrl {
  async create(req, res) {
    const custmrMilk = new CustomerMilk(req.body);
    // const customer = req.body.customer;
    // let cstmr = await Customer.findOne({ _id: customer });

    // if (cstmr) {
    //   cstmr = _.extend(cstmr, req.body);
    //   await cstmr.save();
    // }

    await custmrMilk
      .save()
      .then(result => {
        // console.log("stored..", result);
        res.send(result);
        res.end();
      })
      .catch(err => console.log("error", err));
  }
  async update(req, res) {
    await CustomerMilk.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, result) => {
        if (err || !result) res.status(404).send("could not updated");
        else res.status(200).send(result);
      }
    );
  }
  async delete(req, res) {
    await CustomerMilk.findByIdAndDelete(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  async getAll(req, res) {
    await CustomerMilk.find({})

      .populate("customer") // customer is from customermilk model from line no 6
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  async getSingle(req, res) {

    await CustomerMilk.findById(req.params.id)
      .populate("Customer")
      .then(result => {
        res.send(result);
        console.log("req.body.customer");
      })
      .catch(err => {
        res.status(404).send(err);
        // console.log("req.body.customer");
      });
  }
  async myUserData(req, res) {
    // console.log("req.body.customer");

    await CustomerMilk.find({
      customer: req.body.customer
    })
      .populate("Customer")
      .exec((err, user) => {
        if (err) {
          res.json({ status: false, message: "error while searching" });
        } else res.json({ user });
      });
  }
}
module.exports = CustomerMilkCtrl;
