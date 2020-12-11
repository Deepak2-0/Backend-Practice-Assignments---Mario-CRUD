const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mario = new marioModel({
    name:"Luigi",
    weight: 60
})

// mario.save();

app.get("/mario", async(req,res)=>{

    let characters = await marioModel.find({});
    res.send(characters);
});

app.get("/mario/:id", async(req,res)=>{

    let id = req.params.id;

    try {
        
        let characters = await marioModel.find({_id:id});
        res.send(characters[0]);
        return;

    } catch (error) {
        res.status(400).send({message: error.message});  
    }
});


module.exports = app;