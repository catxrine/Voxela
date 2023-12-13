const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const followRoutes = require("./routes/follow");
const tagsRoutes = require("./routes/tags");

module.exports = function (app) {
  app.use("/auth", authRoutes);
  app.use("/post", postRoutes);
  app.use("/user", userRoutes);
  app.use("/follow", followRoutes);
  app.use("/tags", tagsRoutes);

  app.use((_req, res, _next) => res.status(404).json("Not found"));
};
