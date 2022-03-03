var User = require("../models/User.model");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../Helpers/mailer");
const _ = require("lodash");
class CommonCtrl {
    forgotPassword = async (req, res) => {
        if (!req.body) return res.status(400).json({ message: "No request body" });
        if (!req.body.email)
            return res.status(400).json({ message: "No Email in request body" });

        const { email } = req.body;
        // find the user based on email
        const user = await User.findOne({ email });

        // if err or no user
        if (!user)
            return res.status("401").json({
                error: "User with that email does not exist!"
            });

        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id, iss: "NODEAPI" },

            "top_secret" //this is key
        );

        // email data
        const emailData = {
            from: "vishalpatait.techila@gmail.com",
            to: email,
            subject: "Password Reset Instructions",
            text: `Please use the following link to reset your password: http://localhost:3000/reset-password/${token}`,
            html: `<p>Please use the following link to reset your password:</p> <p>http://localhost:3000/reset-password/${token}</p>`
        };

        return User.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ message: err });
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
                });
            }
        });
    };
    resetPassword = async (req, res) => {
        const { resetPasswordLink, newPassword } = req.body;

        let user = await User.findOne({ resetPasswordLink });
        console.log(user, "user");

        // if err or no user
        if (!user)
            return res.status(401).json({
                error: "Invalid Link!"
            });
        const hashPassword = await bcrypt.hash(newPassword, 10);

        const updatedFields = {
            password: hashPassword,
            resetPasswordLink: ""
        };

        user = _.extend(user, updatedFields);
        user.updated = Date.now();

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Great! Now you can login with your new password.`
            });
        });
    };
}

module.exports = CommonCtrl;
