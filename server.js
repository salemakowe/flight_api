const express = require("express");
const app = express();  //initialise express


// setting up mongoose
const mongoose = require("mongoose");   //initialise mongoose
const mongooseUrl = "mongodb://127.0.0.1/27017/"; //mongoose uri



//connect to Mongoose DB => it takes a connection string or url, an object of options, and the last parameter is a call back function that checks for error
mongoose.connect(
mongooseUrl, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, 
(err) => {
    if(err){
        console.log(`Connection to db was not successful ${err}`)
    } else {
        console.log("connection to db was successful")
    }
}
)


// port
const port = 5000;


// Schema
const flightSchema = new mongoose.Schema({
    title: String,
    time: Number,
    price: Number,
    date: String,

})
const Flight = mongoose.model("Flight", flightSchema) 
//the flight in the string ("Flight") represents a new collection in the flightapp db from the uri, 
//while the the first Ffight represents a potential or and existing document inside the collection



//Creating a new flight (Adding/Booking a new flight)
app.post("/flights", (req, res) => {
    Flight.create({
        title:  req.body.title,
        time:   req.body.time,
        price:  req.body.price,
        date:   req.body.date
    }, (err, newFlight) => {
        if(err) {
            return res.status(500).json ({message: err})
        } else {
            return res.status(200).json ({message})
        }
    })
})



// Getting all Flights
app.get("/flights", (req, res) => {
    Flight.find({}, (err, flight) => {
        if(err) {
            return res.status(500).json ({message: err})
        } else {
            return res.status(200).json ({message})
        }
    })
})



// Getting a single Flight by id
app.get("/flights/:id", (req, res) => {
    Flight.findById(req.params.id, (err, flight) => {
        if(err) {
            return res.status(500).json ({message: err})
        } else if (!flight) {
            return res.status(404).json ({message: "Flight not found"})
        } else {
            return res.status(200).json ({message})
        }
    })
})



// Updating/Editing Flight
app.put("/flights/:id", (req, res) => {
    Flight.findByIdAndUpdate(req.params.id, {
        time: req.body.time,
        date: req.body.date,}, (err, flight) => {
            if(err) {
                res.status(500).json ({message: err})
            } else if (!flight) {
                res.status(404).json ({message: "Flight does not exist"})
            } else {
                flight.save((err, savedFlight) => {
                    if(err) {
                        res.status(400).json ({message: err})
                    } else {
                        res.status(200).json ({message: "Flight updated successfully"})
                    }
                })
            }
        })
})



//Deleting a Flight
app.delete("/flights/:id", (req, res) => {
    Flight.findByIdAndDelete(req.params.id, (err, flight) => {
        if(err){
            return res.status(500).json ({message: err})
        } else if (!flight){
            return res.status(404).json ({message: "No Flight found"})
        } else {
            return res.status(200).json ({message: "Flight successfully deleted"})
        }
    })
})


app.listen(port, ()=>
    console.log (`Server is up and running ${port}`)
)