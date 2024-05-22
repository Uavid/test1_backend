const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

// Route to save data to the database
router.post("/upload", async (req, res) => {
  try {
    console.log("newHHHData");

    const newData = new Data(req.body);
    await newData.save();
    console.log(newData);
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", (req, res) => {
  console.log("newData");

  res.json({ hello: "world" });
});
module.exports = router;
