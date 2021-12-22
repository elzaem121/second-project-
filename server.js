// Require Express to run server and routes
const express = require("express");

// CORS allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
const cors = require("cors");

//body-parser allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require("body-parser");

// listen port
const port = 5800;
const hostname = "127.0.0.1";

// Start up an instance of app
const app = express();

// cors for cross origin allowance
app.use(cors());

// setup server
app.listen(port, function () {
  console.log(`Server running and listen to: http://${hostname}:${port}/`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

// Callback function to complete GET '/all'
const getAll = function (req, res) {
  res.send(projectData);
};

// GET Route
app.get("/setData", getAll);


const postData = function (req, res) {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    content: req.body.content,
  };
  console.log(projectData);
  res.status(200).send(projectData);
};

// GET Route
app.post("/setData", postData);