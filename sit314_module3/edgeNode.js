const express = require('express');
const app = express();
app.use(express.json());

// Load up the env file, from NODEJS documentation
const { loadEnvFile } = require('node:process');
loadEnvFile('./secrets.env');

// Get all the data and nodes required
let request = require('request');
const mongoose = require('mongoose');
const dataFile = require('./models/dataFile.js'); 
const mongoDBURL = process.env.MONGODB_SECRET;

const port = 3000;

// Needed Urls
let configURL = `http://localhost:3001/configSettings`;
let sendConfigURL = 'http://localhost:3001/recieveConfig';

// All of the data is stored here
const tempData = {
    id: 0,
    name: "temperaturesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    temperature: 20
}

const humData = {
    id: 0,
    name: "humiditysensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    humidity: 20
}

const chairData = {
    id: 0,
    name: "chairsensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    chairUsed: 20
}

const peopleData = {
    id: 0,
    name: "peoplesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    people: 20
}

const rawData = {
    temperature: 1,
    humidity: 1,
    chair: 1,
    people: 1
}


const config = {
    con: true,
    vent: true,
    heat: true
};



// Update the main data saves (rawData + config)
function updateData()
{
    let newConfig;
    try {
        request(configURL, function (err, response, body) {
    if(err){
        console.log('error:', err);
    }
    else{
        newConfig = JSON.parse(body);
        // console.log(newConfig);
        config.con = newConfig.con;
        config.vent = newConfig.vent;
        config.heat = newConfig.heat;
    }
    });
    }
    catch
    {

    }
    rawData.temperature = tempData.temperature;
    rawData.humidity = humData.humidity;
    rawData.chair = chairData.chairUsed;
    rawData.people = peopleData.people;
}

// Send the Data to MongoDB
function sendData()
{
     updateData();

     const newDataFile = new dataFile({
        temperature: rawData.temperature,
        humditiy: rawData.humidity,
        peoplePresent: rawData.people,
        chairsUsed: rawData.chair,
        airCon: config.con,
        vent: config.vent,
        Heat: config.heat,
        time: Date.now()
     });

    newDataFile.save().then(doc => {
         // console.log(doc);
        }).then(() => {
        // mongoose.connection.close();
    });     
}

// Update the config settings for HVAC, and send it to HVAC
function updateHVAC()
{
    updateData();
    if (rawData.temperature >= 22)
    {
        console.log("Hot!");
        config.con = true;
        config.heat = false;
    }
    else
    {
        console.log("Cool!");
        config.con = false;
        config.heat = true;
    }

    if (rawData.chair > 3 && rawData.people > 5)
    {
        config.vent = true;
    }
    else
    {
        config.vent = false;
    }
    sendHVAC();
}

// Send off the config settings on this side to HVAC
async function sendHVAC() {
    const jsonData = JSON.stringify(config);
    console.log(jsonData);

    try {
        const response = await fetch(sendConfigURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        const data = await response;
        console.log("Temperate Data sent: ", data);

    } catch (error) {
        console.error("Config Data not sent! ", error);
    }
}

// ALL OF THE GET HTTP END POINTS
// Most just display the data/trigger and update
app.get('/getTemp', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tempData));
});

app.get('/getHum', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(humData));
});

app.get('/getChair', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(chairData));
});

app.get('/getPeople', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(peopleData));
});

app.get('/rawData', function (req, res) {
    rawData.temperature = tempData.temperature;
    rawData.humidity = humData.humidity;
    rawData.chairUsed = chairData.chairUsed;
    rawData.people = peopleData.people;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(rawData));
});

app.get('/updateHVAC', function (req, res) {
    updateHVAC();
});

app.get('/updateConfig', function (req, res) {
    updateData()
    sendData();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(config));
});

// ALL OF THE POST 
// Mainly just to get the data
app.post('/getTemp', (req, res) => {
    const recievedTemp = req.body;
    tempData.id = recievedTemp.id;
    tempData.time = recievedTemp.time;
    tempData.temperature = recievedTemp.temperature;
    // console.log(tempData);
    console.log("Recieved Temp Data");
    sendData();
});

app.post('/getHum', (req, res) => {
    const recievedHum = req.body;
    humData.id = recievedHum.id;
    humData.time = recievedHum.time;
    humData.humidity = recievedHum.humidity;
    // console.log(humData);
    console.log("Recieved Humidity Data");
    sendData();
});

app.post('/getChair', (req, res) => {
    const recievedChair = req.body;
    chairData.id = recievedChair.id;
    chairData.time = recievedChair.time;
    chairData.chairUsed = recievedChair.chairUsed;
    // console.log(chairData);
    console.log("Recieved Chair Data");
    sendData();
});


app.post('/getPeople', (req, res) => {
    const recievedPeople = req.body;
    peopleData.id = recievedPeople.id;
    peopleData.time = recievedPeople.time;
    peopleData.people = recievedPeople.people;
    // console.log(peopleData);
    console.log("Recieved People Data");
    sendData();
});

app.post('/getConfig', (req, res) => {
    const recievedConfig = req.body;
    config.con = recievedConfig.con;
    config.heat = recievedConfig.heat;
    config.vent = recievedConfig.vent;
    console.log("Recieved updated config data");
});


// listen and connect to MONGODB
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

mongoose.connect(mongoDBURL);
