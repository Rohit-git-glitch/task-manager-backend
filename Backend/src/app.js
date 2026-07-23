const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");

const taskRoutes = require("./routes/taskRoutes");

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
app.use("/api/tasks",taskRoutes);

//app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Task Manager Backend!");
});

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;