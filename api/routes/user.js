const router = require("express").Router();
const { PostModel } = require("../models/Post");
const { UserModel } = require("../models/User");

router.get("/:id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  if (!user) return res.status(404).json("User not found");
  const posts = await PostModel.find({ author: user._id }).populate("author");
  return res.status(200).json({ ...user._doc, posts });
});

router.patch("/:id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  user.username = req.body.username;
  user.email = req.body.email;
  user.accent = req.body.accent;

  if (req.body.tag !== null && req.body.tag.trim() !== "") {
    user.tags.push(req.body.tag);
  }
  user.save();

  return res.status(200).json(user);
});

router.get("/all", async (req, res) => {
  const users = await UserModel.find({});
  return res.status(200).json(users);
});

router.get("/all/:param", async (req, res) => {
  const users = await UserModel.find({
    username: { $regex: req.params.param, $options: "i" },
  });
  return res.status(200).json(users);
});

module.exports = router;
