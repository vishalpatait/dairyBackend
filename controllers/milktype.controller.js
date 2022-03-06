const milkType = require("../models/milkType.model");

class milkTypeCtrl {
  create(req, res) {
    const milk = new milkType(req.body);
    milk
      .save()
      .then(result => {
        // console.log("stored..", result);
        res.send(result);
        res.end();
      })
      .catch(err => console.log("error", err));
  }
  update(req, res) {
    milkType.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, result) => {
        if (err || !result) res.status(404).send("could not updated");
        else res.status(200).send(result);
      }
    );
  }
  delete(req, res) {
    milkType.findByIdAndDelete(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  getAll(req, res) {
    milkType.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  getSingle(req, res) {
    milkType.findById(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
}
module.exports = milkTypeCtrl;
