var User = require("../models/User.model");
var bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

class UserCtrl {
  async create(req, res) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    let user = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      mobile: req.body.mobile,

      role: req.body.role
    };
    let newUser = new User(user);

    newUser.save((err, reslut) => {
      //   console.log(reslut);

      if (err) console.log(err);
      else res.status(201).json(reslut);
    });
  }
  async update(req, res) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashPassword, "hashPassword");

    User.findOneAndUpdate(
      { _id: req.params.id },
      { password: hashPassword },
      req.body,
      (err, result) => {
        if (err || !result) res.status(404).send("could not updated");
        else res.status(200).send(result);
      }
    );
  }
  delete(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  getAll(req, res) {
    User.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  getSingle(req, res) {
    User.findById(req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  async login(req, res, next) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("No User Found");
          console.log(err);
          return next(error);
        }
        req.login(user, { session: false }, async error => {
          if (error) return next(error);
          const body = {
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role
          };
          // console.log(body, "body");
          // console.log(user, "user");

          const token = jwt.sign({ user: body }, "top_secret");
          return res.json({ token, user });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
}
module.exports = UserCtrl;
