const Customer = require("../models/customer.model");

class CustomerCtrl {
  create(req, res) {
    const custmr = new Customer(req.body);
    custmr
      .save()
      .then(result => {
        // console.log("stored..", result);
        res.send(result);
        res.end();
      })
      .catch(err => console.log("error", err));
  }
  update(req, res) {
    Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, result) => {
        if (err || !result) res.status(404).send("could not updated");
        else res.status(200).send(result);
      }
    );
  }
  delete(req, res) {
    Customer.findByIdAndDelete(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  getAll(req, res) {
    Customer.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  getSingle(req, res) {
    Customer.findById(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
}
module.exports = CustomerCtrl;
