const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

exports.PostModel = mongoose.model("Post", postSchema);
