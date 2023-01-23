const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const connectDB = require("./config/db");
const port = process.env.PORT;
const appUrl = process.env.APP_URL;
const cors = require("cors");

var corsOptions = {
  origin: appUrl,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/meal", mealRoutes);

//listening to the given port
app.listen(port, () => {
  console.log("app is live on", appUrl);
  connectDB();
});
