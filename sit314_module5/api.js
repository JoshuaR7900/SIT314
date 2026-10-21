// needs
// npm install express
// npm install -g json-server
// npm install mongoose


const express 

= require('express');
const app = express();

app.use(express.json());

// Load up the env file, from NODEJS documentation
const { loadEnvFile } = require('node:process');
loadEnvFile('./secrets.env');

// Get all the data and nodes required
const mongoose = require('mongoose');
const dataFile = require('./models/dataFile.js'); 
const mongoDBURL = process.env.MONGODB_SECRET;

const tempData = {
    id: 0,
    name: "temperaturesensor",
    time: Date.now(),
    temperature: 20
}

// Send the Data to MongoDB
function sendData()
{
     const newDataFile = new dataFile({
        id: tempData.id,
        name: tempData.name,
        time: tempData.time,
        temperature: tempData.temperature
    });

    newDataFile.save().then(doc => {
         // console.log(doc);
        }).then(() => {
        // mongoose.connection.close();
    });     
}

app.post('/getTemp', (req, res) => {
    const recievedTemp = req.body;
    tempData.id = recievedTemp.id;
    tempData.name = recievedTemp.name;
    tempData.time = recievedTemp.time;
    tempData.temperature = recievedTemp.temperature;
    console.log("Recieved Temp Data");
    sendData();
});

app.get('/getTemp', async function (req, res) {
    res.status(200);
});

// listen and connect to MONGODB
app.listen(port, () => {
    console.log(`listening on port ${port}`);
    mongoose.connect(mongoDBURL);
});

