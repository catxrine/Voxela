const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    followers: {
      type: Array,
      required: false,
    },
    followed: {
      type: Array,
      required: false,
    },
    tags: {
      type: Array,
      required: false,
    },
    accent: {
      type: String,
      required: true,
      default: "blue",
    },
  },
  { timestamps: true }
);

userSchema.pre(
  /^delete/,
  { document: true, query: false },
  async function (next) {
    // await PostModel.deleteMany({ author: this._id });
    next();
  }
);

exports.UserModel = mongoose.model("User", userSchema);
