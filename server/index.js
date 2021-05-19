const express = require('express');
const mongoose = require('mongoose');

const FoodModel = require('./models/Food')

const app = express();

app.use(express.json());


app.get('/' , async (req,res) => {
    const food = new FoodModel({foodName: "Rajma" , daySinceIAte: 60});

    try{
        await food.save();
    }
    catch(err){
        console.log(err);
    }
});

mongoose.connect('mongodb+srv://crudapp:crudapp@crud.z1gcd.mongodb.net/food?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
});

app.listen(5000, () => {
    console.log("Server running on port 5000 ");
})