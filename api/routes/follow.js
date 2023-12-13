const router = require("express").Router();
const { UserModel } = require("../models/User");

router.get("/all", async (req, res) => {
  const followed = await UserModel.findOne(
    { _id: req.authorizedUser },
    "followed"
  );
  res.status(200).json(followed);
});

router.post("/add", async (req, res) => {
  const followed = await UserModel.findOne(
    { _id: req.authorizedUser },
    "followed"
  );

  const followers = await UserModel.findOne(
    { _id: req.body.followed },
    "followers"
  );

  if (!followed.followed.find((el) => el.follows === req.body.followed)) {
    followed?.followed?.push({
      user: req.authorizedUser,
      follows: req.body.followed,
    });

    const username = await UserModel.findOne(
      { _id: req.authorizedUser },
      "username"
    );

    followers.followers.push({
      followedBy: req.authorizedUser,
      username: username.username,
    });
    followed.save();
    followers.save();
  }

  res.status(200).json(followed);
});

router.delete("/remove", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.authorizedUser });

  user.followed = user.followed.filter(
    (el) => el.follows.toString() !== req.body.id
  );

  user.save();

  return res.status(200).json("Goodbye");
});

router.get("/all/followers", async (req, res) => {
  const followers = await UserModel.findOne(
    { _id: req.authorizedUser },
    "followers"
  );
  res.status(200).json(followers);
});

module.exports = router;
