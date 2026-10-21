const express = require('express');
const app = express();

const url = 'http://localhost:3000/getChair';

// Data template
const tempData = {
    id: 0,
    name: "chairsensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    chairUsed: 20
};

const tLow = 10;
const tHigh = 0;

// Generate the data
function getData() {
    console.log("Getting Chair!");
    tempData.id = tempData.id + 1;
    tempData.time = Date.now();
    reading = Math.floor(Math.random() * (tHigh - tLow) + tLow);
    tempData.chairUsed = reading;
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
        console.log("Chair  Data sent: ", data);

    } catch (error) {
        console.error("Chair Data not sent! ", error);
    }
}

// Send it in intervals
setInterval(sendTempData,5000);