// smoke_detector.js
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://35.156.142.34:1883");
var topic="/humidity_detector234";
var message="";
var humidity_level=0;

client.on('connect', () =>
{
    console.log('mqtt connected');

    setInterval(function() { //loops every second.
        humidity_level = pollDevice();
        message = humidity_level.toString();
        client.publish(topic, message);
        console.log('published to Topic: ' + topic + " with Message: " + message);
    }, 1000);
});

function pollDevice()
{
    return Math.floor(Math.random() * 40) + 1;
}