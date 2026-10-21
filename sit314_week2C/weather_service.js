const net = require("net");
const port = 6000;

// Load up the env file, from NODEJS documentation
const { loadEnvFile } = require('node:process');
loadEnvFile('./secrets.env');

const mongoose = require('mongoose');
const dataFile = require('./models/dataFile.js'); 
const mongoDBURL = process.env.MONGODB_SECRET;

let temp;
let wind;
let rain;
let weatherArray = Array.from({ length: 10 }, () => Array(10).fill(0));
weatherArray[1][0] = "Mallee";
weatherArray[2][0] = "Wimmera";
weatherArray[3][0] = "South West";
weatherArray[4][0] = "Northern Country";
weatherArray[5][0] = "North Central";
weatherArray[6][0] = "Central";
weatherArray[7][0] = "North East";
weatherArray[8][0] = "East Gippsland";
weatherArray[9][0] = "West and South Gippsland";

const holdData = {
    locationID: 0,
    fire: 0,
    temperature: 0,
    wind: 0,
    rain: 0, 
    time: Date.now()
}

async function createLocation(inputID)
{
    const newTempMelb = await new dataFile({ locationID: inputID, fire: "None", temperature: 0, wind: 0, rain: 0, time: Date.now(), postcode: 3000});
    return await newTempMelb.save();
}

async function findData(inputID)
{
    return await dataFile.findOne({ locationID: inputID});
}

async function updateFireValue(inputID, newData, newTime, newPost)
{
    var result = await dataFile.findOneAndUpdate({ locationID: inputID}, {fire: newData, time: newTime, postcode: parseInt(newPost, 10)}, {returnDocument: 'after'});
    return result;
}

async function updateTempValue(inputID, newData, newTime, newPost)
{
    var result = await dataFile.findOneAndUpdate({ locationID: inputID}, {temperature: parseInt(newData, 10), time: newTime, postcode: parseInt(newPost, 10)}, {returnDocument: 'after'});
    return result;
}

async function updateWindValue(inputID, newData, newTime, newPost)
{
    console.log("Got here");
    var result = await dataFile.findOneAndUpdate({ locationID: inputID}, {wind: newData, time: newTime, postcode: parseInt(newPost, 10)}, {returnDocument: 'after'});
    return result;
}

async function updateRainValue(inputID, newData, newTime, newPost)
{
    var result = await dataFile.findOneAndUpdate({ locationID: inputID}, {rain: parseInt(newData, 10), time: newTime, postcode: parseInt(newPost, 10)}, {returnDocument: 'after'});
    return result;
}

async function deleteByID(inputID)
{
    return await dataFile.deleteOne({locationID: inputID});

}

const server = net.createServer(async (socket) => {
    console.log("Client connected");

    socket.on("data", async (data) => {
        const strData = data.toString();
        console.log(`Received: ${strData}`);

        const command = strData.split(",");
        const name = command[0];
        let value; 
        if (name != "fire")
        {
            value = parseInt(command[1], 10);
        }
        else
        {
            value = command[1];
        }

        area = command[2];
        recievedTime = command[3];
        newPostcode = parseInt(command[4], 10);

        let result;
        let areaIndex;
	    console.log("Name recieved: " + name);
	    console.log("Value recieved: " + value);
        console.log("Area recieved: " + area);
        console.log("Time: " + recievedTime);
        console.log("Postcode Recieved From: " + newPostcode);

        switch (area)
        {
            case "Mallee":
                holdData.locationID = 1;
                break;
            case "Wimmera":
                holdData.locationID = 2;
                break;
            case "South West":
                holdData.locationID = 3;
                break;
            case "Northern Country":
                holdData.locationID = 4;
                break;
            case "North Central":
                holdData.locationID = 5;
                break;
            case "Central":
                holdData.locationID = 6;
                break;
            case "North East":
                holdData.locationID = 7;
                break;
            case "East Gippsland":
                holdData.locationID = 8;
                break;
            case "West and South Gippsland":
                holdData.locationID = 9;
                break;
        }

        console.log("Area Index: " + areaIndex);

        switch (name) {
            case "fire":
                console.log(value);
                result = "ok";
                updateFireValue(holdData.locationID, value, recievedTime, newPostcode);
                break;
            case "temp":
                console.log(value);
		        temp = value;
		        result = "ok";
                updateTempValue(holdData.locationID, value, recievedTime, newPostcode);
                break;
            case "rain":
                console.log(value);
		        rain = value;
                result = "ok";
                updateRainValue(holdData.locationID, value, recievedTime, newPostcode);
                break;
            case "wind":
                console.log(value);
		        wind = value;
		        result = "ok";
                updateWindValue(holdData.locationID, value, recievedTime, newPostcode);
                break;
            case "request":
                console.log(value);
                dataRecieved = await findData(holdData.locationID);
                console.log("Recieved: " + dataRecieved);
		        if(dataRecieved.temperature > 20 && dataRecieved.wind < 50 && dataRecieved.fire > 30 || dataRecieved.fire == "MODERATE" || dataRecieved.fire == "HIGH" || dataRecieved.fire == "EXTREME" || dataRecieved.fire == "CATASTROPHIC")
                    {
		            result = "Weather Warning for " + area;
		}
		else
		   result = "Everything fine for " + area;
                break;
        }
        socket.write(result.toString());
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.log(`Socket Error: ${error.message}`);
    });
});

server.on("error", (error) => {
    console.log(`Server Error: ${error.message}`);
});

server.listen(port, () => {
    console.log(`TCP socket server is running on port: ${port}`);
    createLocation(1);
    createLocation(2);
    createLocation(3);
    createLocation(4);
    createLocation(5);
    createLocation(6);
    createLocation(7);
    createLocation(8);
    createLocation(9);
});


mongoose.connect(mongoDBURL);