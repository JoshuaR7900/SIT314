// smoke_detector.js
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://35.156.142.34:1883");
var topic="/fire_detector123";
var message="";
var fire_level=0;

client.on('connect', () =>
{
    console.log('mqtt connected');

    setInterval(function() { //loops every second.
        fire_level = pollDevice();
        message = fire_level.toString();
        client.publish(topic, message);
        console.log('published to Topic: ' + topic + " with Message: " + message);
    }, 1000);
});

function pollDevice()
{
    return Math.floor(Math.random() * 100) + 1;
}