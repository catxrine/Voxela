const router = require("express").Router();

const { UserModel } = require("../models/User");

router.post("/add", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.authorizedUser });
  user.tags.push(req.body.title);

  return res.status(200).json(user);
});

router.delete("/delete", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.authorizedUser });
  user.tags = user.tags.filter((tag) => tag !== req.body.title);
  user.save();
  return res.status(200).json(user);
});

module.exports = router;
