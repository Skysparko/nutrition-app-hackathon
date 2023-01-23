const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
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
