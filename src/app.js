const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioChar = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/mario", (req, res) => {
  // let characters = await marioChar.find({});
  // res.send(characters);

  marioChar.find({}, (err, data) => {
    if (err) {
      res.status(400).json({ message: err.message });
    }
    else{
        res.json(data);
    }
  });
});

app.get("/mario/:id", (req, res) => {
    const id = req.params.id;
    marioChar
      .findById(id)
      .then((result) => res.send(result))
      .catch((err) => res.status(400).send({ message: err.message }));
});

app.post("/mario", (req, res) => {
  let name = req.body.name;
  let weight = req.body.weight;

  if (name === undefined || name.length === 0 || weight === undefined) {
    res.status(400).send({ message: "either name or weight is missing" });
    return;
  }

  const mario = new marioChar({
    name,
    weight,
  });
  mario.save();
  res.status(201).send(mario);
});

app.patch("/mario/:id", (req, res) => {
    const id = req.params.id;
    const { name, weight } = req.body;
  
    marioChar
      .findByIdAndUpdate(id, req.body, { new: true })
      .then((result) => res.send(result))
      .catch((error) => res.status(400).send({ message: error.message }));
  });
  app.delete("/mario/:id", (req, res) => {
    marioChar
      .findByIdAndDelete(req.params.id)
      .then((result) => res.send({ message: "character deleted" }))
      .catch((err) => res.status(400).send({ message: err.message }));
  });
  module.exports = app;
