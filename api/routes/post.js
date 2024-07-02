const router = require("express").Router();
const { UserModel } = require("../models/User");
const { PostModel } = require("../models/Post");
const { joiValidate } = require("../utils");
const joi = require("joi");

router.get("/:id/all", async (req, res) => {
  const posts = await PostModel.find({ author: req.authorizedUser }).populate(
    "author"
  );
  res.status(200).json(posts);
});

router.post(
  "/",
  joiValidate({
    description: joi.string().trim(true),
    username: joi.string().trim(true),
  }),
  async (req, res) => {
    const createdPost = await PostModel.create({
      description: req.body.description,
      author: req.authorizedUser,
    });

    res.status(200).json(createdPost);
  }
);

router.patch(
  "/:id",
  joiValidate({
    description: joi.string().trim(true),
  }),
  async (req, res) => {
    let post = await PostModel.findOne({ _id: req.params.id });
    post.description = req.body.description;
    post.save();

    return res.status(200).json(post);
  }
);

router.patch("/likes/:id", async (req, res) => {
  const post = await PostModel.findOne({ _id: req.params.id });
  if (post.likes.find((el) => el === req.body.id)) {
    post.likes = post.likes.filter((el) => el !== req.body.id);
  } else {
    post.likes.push(req.body.id);
  }

  post.save();
  return res.status(200).json(post.likes);
});

router.delete("/:id", async (req, res) => {
  const posts = await PostModel.deleteOne({ _id: req.params.id });
  return res.status(200).json(posts);
});

router.get("/all", async (req, res) => {
  let posts = await PostModel.find({}).populate("author");

  res.status(200).json(posts);
});

module.exports = router;
