const express = require('express');
const app = express();

const url = 'http://localhost:3000/getPeople';

// Data template
const tempData = {
    id: 0,
    name: "peoplesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    people: 20
};

const tLow = 0;
const tHigh = 10;

// Generate the data
function getData() {
    console.log("Getting People!");
    tempData.id = tempData.id + 1;
    tempData.time = Date.now();
    reading = Math.floor(Math.random() * (tHigh - tLow) + tLow);
    tempData.people = reading;
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
        console.log("People Data sent: ", data);

    } catch (error) {
        console.error("People Data not sent! ", error);
    }
}

// Perodically send off the data
setInterval(sendTempData,8000);