const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

const url = 'http://localhost:3000/getConfig';

// Config data template
const config = {
    con: true,
    vent: true,
    heat: true
};

// Sends off the config settings to the edge node
async function sendConfig() {
    const jsonData = JSON.stringify(config);
    console.log(jsonData);

    try {
        const response = await fetch(url, {
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

// ALL HTTP GET POINTS
// Mainly done to just update the config settings frmo our side
app.get('/conOn', function (req, res) {
    console.log("Switching Air Con On");
    config.con = true;
    sendConfig();
});

app.get('/conOff', function (req, res) {
    console.log("Switching Air Con Off");
    config.con = false;
    sendConfig();
});

app.get('/ventOn', function (req, res) {
    console.log("Switching Air Con On");
    config.vent = true;
});

app.get('/ventOff', function (req, res) {
    console.log("Switching Air Con Off");
    config.vent = false;
    sendConfig();
});

app.get('/heatOn', function (req, res) {
    console.log("Switching Air Con On");
    config.heat = true;
    sendConfig();
});

app.get('/heatOff', function (req, res) {
    console.log("Switching Air Con Off");
    config.heat = false;
    sendConfig();
});

app.get('/configSettings', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(config));
});

// HTTP POST
// Just to recieve any updates from the edge node
app.post('/recieveConfig', (req, res) => {
    recieved = req.body;
    console.log(recieved);
    config.con = recieved.con;
    config.vent = recieved.vent;
    config.heat = recieved.heat;
    console.log(config);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
