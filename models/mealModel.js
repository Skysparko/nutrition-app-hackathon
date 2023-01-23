const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  meal: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  calorie: {
    type: Number,
  },
});

module.exports = mongoose.model("Meal", mealSchema);
