const bcrypt = require("bcryptjs");
const router = require("express").Router();
const joi = require("joi");

const { UserModel } = require("../models/User");

const { createJWTCookie, joiValidate } = require("../utils");

router
  .route("/register")
  .post(
    joiValidate({
      username: joi.string().alphanum().min(3).max(25).trim(true).required(),
      email: joi.string().email().trim(true).required(),
      password: joi.string().min(8).trim(true).required(),
    }),
    async (req, res) => {
      let userExists = await UserModel.findOne({ email: req.body.email });
      let usernameExists = await UserModel.findOne({
        username: req.body.username,
      });

      if (userExists || usernameExists)
        return res.status(403).json("User already exists");

      bcrypt.hash(req.body.password, 10).then(async (hash) => {
        let user = await UserModel.create({
          ...req.body,
          password: hash,
        });
        return res.status(201).json({ jwt: createJWTCookie(user._id) });
      });
    }
  )
  .all((_req, res) => {
    res.status(405).json("Route is POST only");
  });

router
  .route("/login")
  .post(
    joiValidate({
      email: joi.string().email().trim(true).required(),
      password: joi.string().min(8).trim(true).required(),
    }),
    async (req, res) => {
      let userAttempting = await UserModel.findOne({
        email: req.body.email,
      }).select("+password");
      if (!userAttempting) return res.status(403).json("User does not exists");

      await bcrypt
        .compare(req.body.password, userAttempting.password)
        .then((result) => {
          if (result) {
            return res.status(200).json({
              jwt: createJWTCookie(userAttempting._id),
              username: userAttempting.username,
              userId: userAttempting._id,
            });
          } else {
            return res.status(401).json("Wrong credentials");
          }
        });
    }
  )
  .all((_req, res) => {
    res.status(405).json("Route is POST only");
  });

router
  .route("/")
  .delete(async (req, res) => {
    let userAttempting = await UserModel.findOne({
      _id: req.authorizedUser,
    });
    if (!userAttempting) return res.status(403).json("Wrong credentials");

    await userAttempting.deleteOne();
    return res.status(200).json("Goodbye");
  })
  .all((_req, res) => {
    res.status(405).json("Route is POST only");
  });

module.exports = router;
