const router = require("express").Router();

const { UserModel } = require("../models/User");

router.get("/:id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id });
  if (!user) return res.status(404).json("User not found");
  user.posts = user.posts.reverse();

  return res.status(200).json(user);
});

router.patch("/:id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id });

  user.username = req.body.username;
  user.email = req.body.email;

  if (req.body.tag !== null && req.body.tag.trim() !== "") {
    user.tags.push(req.body.tag);
  }
  user.save();

  return res.status(200).json(user);
});

module.exports = router;
