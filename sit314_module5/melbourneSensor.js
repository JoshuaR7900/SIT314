const express = require('express');
const app = express();
const http = require('http');


const url = 'http://creditLoadBalancer-1747801867.us-east-1.elb.amazonaws.com:3000/getTemp';

// Data template
const tempData = {
    id: 0,
    name: "melbourneSensor",
    time: Date.now(),
    temperature: 0
};

const tLow = 0;
const tHigh = 40;

// Generate Data
function getData() {
    console.log("Getting Melbourne!");
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
        console.log("Melbourne Data sent: ", data);

    } catch (error) {
        console.error("Melbourne Data not sent! ", error);
    }
}


setInterval(sendTempData,2000);