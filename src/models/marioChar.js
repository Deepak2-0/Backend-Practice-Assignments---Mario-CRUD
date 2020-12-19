const mongoose = require('mongoose');

const marioSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required: true
    }
})

const marioChar = mongoose.model("marioChar", marioSchema);


module.exports = marioChar;