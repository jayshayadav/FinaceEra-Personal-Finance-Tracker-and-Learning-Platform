const express = require("express");
const Tutorial = require("../models/Tutorial");
const router = express.Router();

router.get("/", async (req, res) => {
  const tutorials = await Tutorial.find().sort({ order: 1 });
  res.json(tutorials);
});

router.get("/:id", async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);
  res.json(tutorial);
});

module.exports = router;
