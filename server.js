const express = require ("express");
const app = express();

app.get("/", ()=>{
    res.send(console.log("Hello API world"))
})

app.listen(5000, ()=>{
    console.log ("Server is up and running")
})