const isAuthorized = require("../middlewares/auth");
const Meal = require("../models/mealModel");

const router = require("express").Router();
const fetch = require("node-fetch");

router.post("/add", isAuthorized, async (req, res) => {
  try {
    const { meal, time } = req.body;
    let { calorie } = req.body;
    if (!meal || !time) {
      return res.status(400).send("please fill the required fields");
    }
    if (!calorie) {
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-app-id": "bf225eba",
            "x-app-key": "3b0459d3897c8697712241640cd33ad0",
          },
          body: JSON.stringify({ query: meal }),
        }
      );
      const data = await response.json();
      calorie = data.foods[0].nf_calories;

      if (!calorie) {
        calorie = 250;
      }

      const mealDetails = {
        meal,
        time,
        calorie,
      };

      const mealDB = new Meal(mealDetails);
      mealDB.save();
      return res.status(200).json({ mealDB });
    }

    const mealDetails = {
      meal,
      time,
      calorie,
    };

    const mealDB = new Meal(mealDetails);
    mealDB.save();
    return res.status(200).json({ mealDB });
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
    const { meal, time, calorie } = req.body;
    const mealItem = await Meal.findById(req.params.id);
    if (!meal || !time || !calorie) {
      return res.status(400).send("please fill the required fields");
    }
    if (!mealItem) {
      return res.status(404).send("Meal not found");
    }

    mealItem.meal = meal;
    mealItem.time = time;
    mealItem.calorie = calorie;
    await mealItem.save();

    return res.status(200).json({ mealItem });
  } catch (error) {
    console.log("<<<<<<<<<<<<<", error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
