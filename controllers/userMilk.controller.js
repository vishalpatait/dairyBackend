const UserMilk = require("../models/userMilk.model");
const _ = require("lodash");
class UserMilkCtrl {
  async create(req, res) {
    const usrMilk = new UserMilk(req.body);
    await usrMilk
      .save()
      .then(result => {
        // console.log("stored..", result);
        res.send(result);
        res.end();
      })
      .catch(err => console.log("error", err));
  }
  async update(req, res) {
    await UserMilk.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, result) => {
        if (err || !result) res.status(404).send("could not updated");
        else res.status(200).send(result);
      }
    );
  }
  async delete(req, res) {
    await UserMilk.findByIdAndDelete(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  async getAll(req, res) {
    await UserMilk.find({})
      .populate("userId")
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  async getSingle(req, res) {
    await UserMilk.findById(req.params.id)
      .populate("userId")
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  async userMilkData(req, res) {
    await UserMilk.find({
      userId: req.body.userId
    })
      .populate("userId")
      .exec((err, user) => {
        if (err) {
          res.json({ status: false, message: "error while searching" });
        } else res.json({ user });
      });
  }
}
module.exports = UserMilkCtrl;
