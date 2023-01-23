const Meal = require("../models/mealModel");

const router = require("express").Router();
const fetch = require("node-fetch");

router.post("/add", async (req, res) => {
  try {
    const { meal, time, calorie } = req.body;
    if (!meal || !time) {
      return res.status(400).send("please fill the required fields");
    }
    if (!calorie) {
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          Method: "POST",
          Headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-app-id": "bf225eba",
            "x-app-key": "3b0459d3897c8697712241640cd33ad0",
          },
          Body: {
            query: meal,
          },
        }
      );
      const data = await response.JSON();

      calorie = data;
    }
    return res.status(200).send(calorie);
  } catch (error) {
    console.log("<<<<<<<<<<<<<", error);
    return res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find({});
    return res.status(200).json({ meals });
  } catch (error) {
    console.log("<<<<<<<<<<<<<", error);
    return res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { meal, time } = req.body;
    const mealItem = await Meal.findById(req.params.id);
    if (!meal || !time) {
      return res.status(400).send("please fill the required fields");
    }
    if (!mealItem) {
      return res.status(404).send("Meal not found");
    }

    mealItem.meal = meal;
    mealItem.time = time;
    await mealItem.save();

    return res.status(200).json({ mealItem });
  } catch (error) {
    console.log("<<<<<<<<<<<<<", error);
    return res.status(500).send(error.message);
  }
});
