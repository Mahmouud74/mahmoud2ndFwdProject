// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;
// Require Express to run server and routes
const express= require('express');
//require path for sendFile html
const path=require('path');
// Start up an instance of app
const app= express();
/* Middleware*/
//app.use(express.urlencoded({extended:false}));
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize the main project folder
app.use(express.static('website'));
app.get('/getRoute',(req,res)=>{
//  res.sendFile(path.join(__dirname,'website/index.html'));
  res.send(projectData);
})
app.post('/postRoute',(req,res)=>{
  console.log(req.body.temp);
  projectData=req.body;
  res.send();
})



// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Setup Server
app.listen(port,()=>{
    console.log('serverIsRunning successfully');
})