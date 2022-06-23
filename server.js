const express = require("express");
const app = express();  //initialise express

const port = 5000;

app.get("/", (req, res) => res.send("Hello API world"))

app.listen(port, ()=>
    console.log (`Server is up and running ${port}`)
)