const mongoose = require('mongoose');

setInterval(sensortest, 1000);
counter = 0;

function sensortest()
{
     mongoose.connect('mongodb+srv://s224423229_db_user:Qe6vqautmyD1Ihyq@sit314.qgchto8.mongodb.net');
     const Sensor = require('./models/sensor'); 

     const sensordata = {
     id: counter,
     name: "temperaturesensor",
     address: "221 Burwood Hwy, Burwood VIC 3125",
     time: Date.now(),
     temperature: 20
     }

     const low = 10;
     const high = 40;
     time1 = Date.now();
     reading = Math.floor(Math.random() * (high - low) + low);
     sensordata.temperature = reading;

     const jsonString = JSON.stringify(sensordata);
     console.log(jsonString);

     const newSensor = new Sensor({
          id: sensordata.id,
          name: sensordata.name,
          address: sensordata.address,
          time: sensordata.time,
          temperature: sensordata.temperature
          });

     newSensor.save().then(doc => {
          time2 = Date.now();
          console.log(time2-time1);
          console.log(doc);
          }).then(() => {
          // mongoose.connection.close();
     });
     counter++;
}
