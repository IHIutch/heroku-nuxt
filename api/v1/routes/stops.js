const express = require("express");
const router = express.Router();
const db = require("../models/index");

const Stop = db.Stop;

router.get("/", (req, res) =>
  Stop.findAll()
    .then((stops) => {
      res.send(stops);
    })
    .catch((err) => console.log(err))
);

router.post("/", (req, res) => {
  let { stopName, stopCode, stopDesc, stopLat, stopLon } = req.body;

  Stop.create({
    stopName: stopName,
    stopCode: stopCode,
    stopDesc: stopDesc,
    stopLat: stopLat,
    stopLon: stopLon,
  })
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

module.exports = router;
