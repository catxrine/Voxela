const express = require("express");
const app = express();

require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => console.log("Error when connecting to DB: ", err));

require("express-async-errors");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { checkAuth } = require("./utils");
app.use(checkAuth);

require("./router")(app);

app.use((error, _req, res, _next) => {
  console.log("[SERVER ERROR]", error);
  res.status(error.status || 500).json(error.message);
});

app.listen(3030, () => {
  console.log(`Listening on http://localhost:3030/`);
});
