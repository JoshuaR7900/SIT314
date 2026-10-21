const express = require('express');
const app = express();

const url = 'http://localhost:3000/getHum';

// Data template
const tempData = {
    id: 0,
    name: "humidityensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    humidity: 20
};

const tLow = 20;
const tHigh = 80;

// Generate Data
function getData() {
    console.log("Getting Humidity!");
    tempData.id = tempData.id + 1;
    tempData.time = Date.now();
    reading = Math.floor(Math.random() * (tHigh - tLow) + tLow);
    tempData.humidity = reading;
}

// Send off the data
async function sendTempData() {
    getData();
    const jsonData = JSON.stringify(tempData);
    console.log(jsonData);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        const data = await response.json();
        console.log("Humidity Data sent: ", data);

    } catch (error) {
        console.error("Humidity Data not sent! ", error);
    }
}

setInterval(sendTempData,10000);