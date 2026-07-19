const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
//todo Very very imp express.json() is a middleware
/* 
    app.use() tells Express:
    "For every incoming request, run this middleware first."
    
    express.json() is a middleware that reads the JSON data 
    sent in the request body, converts it into a JavaScript
    object, and stores it in req.body
*/

app.use("/api/users",userRoutes);


//app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Task Manager Backend!");
});

module.exports = app;