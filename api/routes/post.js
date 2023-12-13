const router = require("express").Router();
const { UserModel } = require("../models/User");
const { joiValidate } = require("../utils");
const joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.get("/:id/all", async (req, res) => {
  const posts = await UserModel.findOne({ _id: req.authorizedUser }, "posts");
  res.status(200).json(posts);
});

router.post(
  "/",
  joiValidate({
    description: joi.string().trim(true),
    username: joi.string().trim(true),
  }),
  async (req, res) => {
    const posts = await UserModel.findOne({ _id: req.authorizedUser }, "posts");

    posts.posts.push({
      _id: new ObjectId(),
      description: req.body.description,
      author: req.authorizedUser,
      username: req.body.username,
      createdAt: new Date(),
    });

    posts.save();
    res.status(200).json(posts);
  }
);

router.patch(
  "/:id",
  joiValidate({
    description: joi.string().trim(true),
  }),
  async (req, res) => {
    const user = await UserModel.findOne({ _id: req.authorizedUser });

    let post = user.posts.find((el) => el._id.toString() === req.params.id);
    post.description = req.body.description;

    user.posts.find((el) => {
      if (el._id.toString() === req.params.id) {
        el.description = req.body.description;
      }
    });
    user.posts[
      user.posts.findIndex((el) => el._id.toString() === req.params.id)
    ] = post;
    user.save();

    return res.status(200).json(user.posts);
  }
);

router.delete("/:id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.authorizedUser });

  user.posts = user.posts.filter((el) => el._id.toString() !== req.params.id);

  user.save();

  return res.status(200).json(user.posts);
});

router.get("/all", async (req, res) => {
  const users = await UserModel.find({});
  let posts = [];

  users.map((user) => {
    user.posts.map((el) => {
      if (!Array.isArray(el)) {
        posts.push(el);
      }
    });
  });
  res.status(200).json(posts);
});

module.exports = router;
