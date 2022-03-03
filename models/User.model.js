const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    mobile: {
      type: String
    },

    role: {
      type: String,
      enum: [
        "admin",
        "user1",
        "user2",
        "user4",
        "user5",
        "user6",
        "user7",
        "user8",
        "user9",
        "user10"
      ],
      default: "user1"
    },
    resetPasswordLink: {
      data: String,
      default: ""
    }
  },

  { collection: "user" }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
