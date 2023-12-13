const jwt = require("jsonwebtoken");
const joi = require("joi");

const { UserModel } = require("./models/User");

exports.createJWTCookie = (user) => {
  let expireAt = 3 * 30 * 24 * 60 * 60; /* 3 months */
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expireAt,
  });
};

exports.joiValidate = (schema) => (req, res, next) => {
  let validation = joi.object(schema).validate(req["body"]);
  if (validation.error)
    return res.status(400).json(validation.error.details[0].message);

  next();
};

exports.checkAuth = async (req, res, next) => {
  if (req.path.includes("login") || req.path.includes("register"))
    return next();

  try {
    let verified = jwt.verify(req.headers?.jwt, process.env.JWT_SECRET);

    let currentUser = await UserModel.exists({ _id: verified.id });
    if (!currentUser)
      return res
        .status(401)
        .json("The user belonging to this token no longer exist.");

    req.authorizedUser = verified.id;
    next();
  } catch (err) {
    if (err.name !== "JsonWebTokenError") console.log(err);
    return res.status(401).json({ error: "Not Authorized" });
  }
};
