const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const FoodModel = require('./models/Food')

const app = express();

app.use(express.json());

app.use(cors());

// ###########  insert #############
app.post('/insert' , async (req,res) => {

    const FoodName = req.body.FoodName;
    const Days = req.body.Days;

    const food = new FoodModel({foodName: FoodName , daySinceIAte: Days});

    try{
        await food.save();
        res.send("inserted data");
    }
    catch(err){
        console.log(err);
    }
});

// ########### read ############

app.get('/read' , async (req,res) => {
    FoodModel.find({} , (err , result) =>  {
        if(err) {
            res.send(err);
        }

        res.send(result);
    })
});

// ############ update #############
app.put('/update' , async (req,res) => {

    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
       await FoodModel.findById(id , (err,updatedFood) => {
           updatedFood.foodName = newFoodName;
           updatedFood.save();
           res.send("update");
       });
    }
    catch(err){
        console.log(err);
    }
});

// ###### delete ########
app.delete('/delete/:id' , async (req , res ) => {
    const id = req.params.id;
    
    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

const mongodb_url = "mongodb+srv://newUser:crudapp@crudapp.dao48.mongodb.net/Food?retryWrites=true&w=majority";
mongoose.connect(mongodb_url , {    
    useNewUrlParser: true,
});

app.listen(5000, () => {
    console.log("Server running on port 5000 ");
})