import express from "express";
import { Category } from "../models/index";

const router = express.Router();

router.post("/create", (req, res) => {
  const { text, value } = req.body;

  Category.create({
    text,
    value,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => console.log(err));
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      } else {
        category
          .update(data)
          .then(res.sendStatus(201))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

export default router;
