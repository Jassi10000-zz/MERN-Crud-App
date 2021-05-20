const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const FoodModel = require('./models/Food')

const app = express();

app.use(express.json());

app.use(cors());

// app.post('/insert' , async (req,res) => {

//     const FoodName = req.body.FoodName;
//     const Days = req.body.Days;

//     const food = new FoodModel({foodName: FoodName , daySinceIAte: Days});

//     try{
//         await food.save();
//         res.send("inserted data");
//     }
//     catch(err){
//         console.log(err);
//     }
// });


app.get('/read' , async (req,res) => {
    FoodModel.find({} , (err , result) =>  {
        if(err) {
            res.send(err);
        }

        res.send(result);
    })
});


const mongodb_url = "mongodb+srv://newUser:crudapp@crudapp.dao48.mongodb.net/Food?retryWrites=true&w=majority";
mongoose.connect(mongodb_url , {
    useNewUrlParser: true,
});

app.listen(5000, () => {
    console.log("Server running on port 5000 ");
})