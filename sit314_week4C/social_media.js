//smoke_alarm.js
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://35.156.142.34:1883");
var topic="/social_media123"

client.on('connect', () => 
{
    client.subscribe(topic);
    console.log('mqtt connected');
});

client.on('message', (topic, message) => 
{
    console.log('Recieved From Topic: ' + topic + ": " + message);
});