const express = require('express');
const app = express();

const url = 'http://localhost:3000/getTemp';

// Data template
const tempData = {
    id: 0,
    name: "temperaturesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    temperature: 20
};

const tLow = 10;
const tHigh = 40;

// Generate the data
function getData() {
    console.log("Getting Temp!");
    tempData.id = tempData.id + 1;
    tempData.time = Date.now();
    reading = Math.floor(Math.random() * (tHigh - tLow) + tLow);
    tempData.temperature = reading;
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
        console.log("Temperate Data sent: ", data);

    } catch (error) {
        console.error("Temperature Data not sent! ", error);
    }
}

// Perodically send off the data
setInterval(sendTempData,5000);