const express = require("express");
const router = express.Router();
const { Category } = require("../models/index");

router.post("/create", (req, res) => {
  const { text, value } = req.body;

  Category.create({
    text,
    value,
  })
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.sendStatus(404).json({ error: "Category not found" });
      } else {
        category
          .update(data)
          .then(res.sendStatus(201))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
