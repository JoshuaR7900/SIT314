var weather = require('weather-js'); 

const express = require('express');
const app = express();
const port = 3000;
const base = `${__dirname}/public`;
app.use(express.static('public'));
app.use(express.json());


// Load up the env file, from NODEJS documentation
const { loadEnvFile } = require('node:process');
loadEnvFile('./secrets.env');

// Get all the data and nodes required
let request = require('request');
const mongoose = require('mongoose');
const dataFile = require('./models/dataFile.js'); 
const mongoDBURL = process.env.MONGODB_SECRET;

// Melbourne ID = 1
// Sydney ID = 2
// Brisbane ID = 3

async function createLocation(inputID)
{
    const newTempMelb = await new dataFile({ locationID: inputID, temperature: 0, date: Date.now() });
    return await newTempMelb.save();
}

async function findTempByID(inputID)
{
    return await dataFile.findOne({ locationID: inputID});
}

async function updateTemp(inputID, newTemp)
{
    var result = await dataFile.findOneAndUpdate({ locationID: inputID}, {temperature: newTemp}, {returnDocument: 'after'});
    return result;
}

async function deleteByID(inputID)
{
    return await dataFile.deleteOne({locationID: inputID});

}

// MELBOURNE CLUSTER
app.get('/MelbourneCreate', async function (req, res) {
    const query = await findTempByID(1);
    if (query != null)
    {
        var page = "<p>Smart-heating</p>"+"Already a Melbourne!!";
        res.send(page);
    }
    else
    {
        createLocation(1)
        var page = "<p>Smart-heating</p>"+"Made a Melbourne!";
        res.send(page);
    }
});

app.get('/MelbourneRead', async function (req, res) {
    const query = await findTempByID(1);
    if (query == null)
    {
        console.log("Not found!");
        var page = "<p>Smart-heating</p>"+"No Melbourne!";
        res.send(page);
    }
    else
    {
        const temp = query.temperature;
        console.log("Temperature Found: " + temp);

        if(temp>10){
            var page = "<p>Smart-heating</p>"+"Its a warm "+temp+"C "+"day in Melbourne!";
            res.send(page);
        }
        else{
            var page = "<p>Smart-heating</p>"+"Its a cold "+temp+"C, "+"day in Melbourne!";
            res.send(page);
        }
    }
    
});

app.get('/MelbourneUpdate', async function (req, res) {
    
    const result = await new Promise((resolve, reject) => 
        weather.find({search: 'Melbourne, AU', degreeType: 'C'}, function(err, result) {
            if (err)
            {
                reject(err);
            }
            else {  
                resolve(result);
            }  
        })
    );
    
    
    const newTemp = result[0].current.temperature;
    console.log(newTemp);
    const query = await updateTemp('1', newTemp); 
    if (query == null)
    {
        var page = "<p>Smart-heating</p>"+"No Melbourne!";
        res.send(page);
    }
    else
    {
        console.log(query);
        const temp = query.temperature;

            if(temp>10){
                var page = "<p>Smart-heating</p>"+"Its a warm "+temp+"C, "+"Melbourne day";
                res.send(page);
            }
            else{
                var page = "<p>Smart-heating</p>"+"Its a cold "+temp+"C, "+"Melbourne Day";
                res.send(page);
            } 
        }
});

app.get('/MelbourneDelete', async function (req, res) {
    var result = deleteByID(1);
 
    var page = "<p>Smart-heating</p>"+"Deleted Melbourne! AHHH!!!";
    res.send(page);

});


// SYDNEY CLUSTER
app.get('/SydneyCreate', async function (req, res) {
    const query = await findTempByID(2);
    if (query != null)
    {
        var page = "<p>Smart-heating</p>"+"Already a Sydney!!";
        res.send(page);
    }
    else
    {
        createLocation(1)
        var page = "<p>Smart-heating</p>"+"Made a Sydney!";
        res.send(page);
    }
});

app.get('/SydneyRead', async function (req, res) {
    const query = await findTempByID(2);
    if (query == null)
    {
        var page = "<p>Smart-heating</p>"+"No Sydney!";
        res.send(page);
    }
    else
    {
        const temp = query.temperature;
        console.log("Temperature Found: " + temp);

        if(temp>10){
            var page = "<p>Smart-heating</p>"+"Its a warm "+temp+"C "+"day in Sydney!";
            res.send(page);
        }
        else{
            var page = "<p>Smart-heating</p>"+"Its a cold "+temp+"C, "+"day in Sydney!";
            res.send(page);
        }
    }
    
});

app.get('/SydneyUpdate', async function (req, res) {
    
    const result = await new Promise((resolve, reject) => 
        weather.find({search: 'Sydney, AU', degreeType: 'C'}, function(err, result) {
            if (err)
            {
                reject(err);
            }
            else {  
                resolve(result);
            }  
        })
    );
    
    
    const newTemp = result[0].current.temperature;
    console.log(newTemp);
    const query = await updateTemp(2, newTemp); 
    if (query == null)
    {
        var page = "<p>Smart-heating</p>"+"No Sydney!";
        res.send(page);
    }
    else
    {
        console.log(query);
        const temp = query.temperature;

            if(temp>10){
                var page = "<p>Smart-heating</p>"+"Its a warm "+temp+"C, "+"Sydney day";
                res.send(page);
            }
            else{
                var page = "<p>Smart-heating</p>"+"Its a cold "+temp+"C, "+"Sydney Day";
                res.send(page);
            } 
        }
});

app.get('/SydneyDelete', async function (req, res) {
    var result = deleteByID(2);

    var page = "<p>Smart-heating</p>"+"Deleted Sydney! AHHH!!!";
    res.send(page);
    
});


// BRISBANE CLUSTER
app.get('/BrisbaneCreate', async function (req, res) {
    const query = await findTempByID(3);
    if (query != null)
    {
        var page = "<p>Smart-heating</p>"+"Already a Brisbane!!";
        res.send(page);
    }
    else
    {
        createLocation(1)
        var page = "<p>Smart-heating</p>"+"Made a Brisbane!";
        res.send(page);
    }
});


app.get('/BrisbaneRead', async function (req, res) {
    const query = await findTempByID(3);
    if (query == null)
    {
        var page = "<p>Smart-heating</p>"+"No Brisbane!";
        res.send(page);
    }
    else
    {
        const temp = query.temperature;
        console.log("Temperature Found: " + temp);

        if(temp>10){
            var page = "<p>Smart-heating</p>"+"Its a warm "+temp+"C "+"day in Brisbane!";
            res.send(page);
        }
        else{
            var page = "<p>Smart-heating</p>"+"Its a cold "+temp+"C, "+"day in Brisbane!";
            res.send(page);
        }
    }
    
});

app.get('/BrisbaneUpdate', async function (req, res) {
    
    const result = await new Promise((resolve, reject) => 
        weather.find({search: 'Brisbane, AU', degreeType: 'C'}, function(err, result) {
            if (err)
            {
                reject(err);
            }
            else {  
                resolve(result);
            }  
        })
    );
    
    
    const newTemp = result[0].current.temperature;
    console.log(newTemp);
    const query = await updateTemp(3, newTemp); 
    if (query == null)
    {
        var page = "<p>Smart-heating</p>"+"No Brisbane!";
        res.send(page);
    }
    else
    {
        console.log(query);
        const temp = query.temperature;

            if(temp>10){
                var page = "<p>Smart-heating</p>"+"Its a warm "+temp+"C, "+"Brisbane day";
                res.send(page);
            }
            else{
                var page = "<p>Smart-heating</p>"+"Its a cold "+temp+"C, "+"Brisbane Day";
                res.send(page);
            } 
        }
});

app.get('/BrisbaneDelete', async function (req, res) {
    var result = deleteByID(3);


    var page = "<p>Smart-heating</p>"+"Deleted Brisbane! AHHH!!!";
    res.send(page);

});


app.listen(port, async function ()  {
    console.log(`listening on port ${port}`);
    if (await findTempByID(1) == null)
    {
        createLocation(1);
    }

    if (await findTempByID(2) == null)
    {
        createLocation(2);
    }

    if (await findTempByID(3) == null)
    {
        createLocation(3);
    }

});

mongoose.connect(mongoDBURL);