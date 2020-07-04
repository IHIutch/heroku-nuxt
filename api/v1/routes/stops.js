const express = require("express");
const router = express.Router();
const Stop = require("../models/Stop");

router.get("/", (req, res) =>
  Stop.findAll()
    .then((stops) => {
      res.send(stops);
    })
    .catch((err) => console.log(err))
);

router.post("/", (req, res) => {
  let { stop_name, stop_code, stop_desc, stop_lat, stop_lon } = req.body;

  Stop.create({
    stop_name: stop_name,
    stop_code: stop_code,
    stop_desc: stop_desc,
    stop_lat: stop_lat,
    stop_lon: stop_lon,
  })
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

module.exports = router;
