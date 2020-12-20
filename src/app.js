const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
app.post("/mario", (req, res) => {
  if (!req.body.weight || !req.body.name) {
    res.status(400).send({ message: "either name or weight is missing" });
    return;
  }
  const mario = new marioModel({
    name: req.body.name,
    weight: Number(req.body.weight, 10),
  });
  mario
    .save()
    .then((result) => res.status(201).send(result))
    .catch((err) =>
      res.status(400).send({ message: "either name or weight is missing" })
    );
});
app.get("/mario", (req, res) => {
  marioModel.find({}, (err, result) => {
    res.send(result);
  });
});
app.get("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findById(id)
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send({ message: err.message }));
});
app.patch("/mario/:id", (req, res) => {
  const id = req.params.id;
  const { name, weight } = req.body;

  marioModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => res.status(400).send({ message: error.message }));
});
app.delete("/mario/:id", (req, res) => {
  marioModel
    .findByIdAndDelete(req.params.id)
    .then((result) => res.send({ message: "character deleted" }))
    .catch((err) => res.status(400).send({ message: err.message }));
});
module.exports = app;
