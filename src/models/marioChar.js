const mongoose = require('mongoose');

const marioSchema = mongoose.Schema({
    name:{
        type:String
    },
    weight:{
        type:Number
    }
})

const marioChar = mongoose.model("marioChar", marioSchema);


module.exports = marioChar;