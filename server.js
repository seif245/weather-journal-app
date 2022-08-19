// Setup empty JS object to act as endpoint for all routes
let projectData = {}; //to store data of project

// Require Express to run server and routes
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express") ;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 2003;
app.listen(port, function inConsole (){
    console.log("server is running successful on link http://localhost:"+port);
});
// when we sending data
app.post("/dataRepo",function dataSend(req,res){
    projectData = req.body;
    res.send({objectMsg:"Done send Data"});
});
//when we getting data
app.get("/dataBox", function dataGet(req,res){
    res.send(projectData);
});