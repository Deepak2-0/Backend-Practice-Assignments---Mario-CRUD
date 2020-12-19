const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioChar = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/mario", (req,res)=>{

    // let characters = await marioChar.find({});
    // res.send(characters);

    marioChar.find({}, (err, data) => {
        if(err){
            res.status(400).json({"message": error.message});
        }
        else{
            res.json(data);
        }
    });
});

app.get("/mario/:id", (req,res)=>{

    // marioChar.findOne({
    //     _id: id,
    // }).then((err,data) => {
    //     if (err) {
    //         res.status(400).json({"message": error.message});
    //     } else{
    //         res.json(data);
    //     }
    // });

    marioChar.findOne({
        _id: id,
    }).then((data) => {
        if (!data) {
            res.status(400).json({"message": error.message});
        } else{
            res.json(data);
        }
    });


});


app.post("/mario",(req,res)=>{
    let name = req.body.name;
    let weight = req.body.weight;

    if(name === undefined || name.length === 0 || weight === undefined){
        res.status(400).send({message: 'either name or weight is missing'});
        return;
    }

    const mario = new marioChar({
        name,
        weight
    })
    mario.save();
    res.status(201).send(mario);
})

app.patch("/mario/:id",async (req,res)=>{
    
    try {

        let id = req.params.id;
        let updateObject = req.body;

        //let check = await marioChar.find({_id :id});

        // if(check.length === 0) throw new Error;

        await marioChar.update(
            { _id: id },
            {$set: updateObject},
            {returnOriginal: false}
        );

        let data = await marioChar.findById({_id:id})

        // console.log(updateObject);
        // console.log(data);

        res.status(201).send(data);
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})

app.delete("/mario/:id",async (req,res)=>{
    
    try {

        let id = req.params.id;

        let data = await marioChar.findById({_id:id});

        if(!data){

            res.status(400).send({message: error.message});
        }

        await marioChar.deleteOne(
            { _id: id }
        );

        res.status(200).send({message: 'character deleted'});
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})


module.exports = app;