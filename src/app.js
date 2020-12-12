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

// const mario = new marioModel({
//     name:"Luigi",
//     weight: 60
// })

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


app.post("/mario",(req,res)=>{
    let name = req.body.name;
    let weight = req.body.weight;

    if(name === undefined || name.length === 0 || weight === undefined){
        res.status(400).send({message: 'either name or weight is missing'});
        return;
    }

    const mario = new marioModel({
        name,
        weight
    })
    mario.save();
    // console.log(name);
    // console.log(weight);
    // console.log(mario);
    res.send(mario);
})


module.exports = app;