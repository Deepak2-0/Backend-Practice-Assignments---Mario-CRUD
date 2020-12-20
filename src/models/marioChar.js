  
const mongoose = require("mongoose");

//  Your code goes here
const schema = new mongoose.Schema({
  name: String,
  weight: Number,
});
const marioModel = mongoose.model("mariochar", schema);

module.exports = marioModel;