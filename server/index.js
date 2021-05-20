const express = require('express');

const mongoose = require('mongoose');

const FoodModel = require('./models/Food')

const app = express();

app.use(express.json());


app.get('/' , async (req,res) => {
    const food = new FoodModel({foodName: "Frankie" , daySinceIAte: 60});

    try{
        await food.save();
        res.send("inserted data");
    }
    catch(err){
        console.log(err);
    }
});

const mongodb_url = "mongodb+srv://newUser:crudapp@crudapp.dao48.mongodb.net/Food?retryWrites=true&w=majority";
mongoose.connect(mongodb_url , {
    useNewUrlParser: true,
});

app.listen(5000, () => {
    console.log("Server running on port 5000 ");
})