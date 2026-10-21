const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://35.156.142.34:1883");
var topic="/heat_detector341";
var message="";
var heat_level=0;

client.on('connect', () =>
{
    console.log('mqtt connected');

    setInterval(function() { //loops every second.
        heat_level = pollDevice();
        message = heat_level.toString();
        client.publish(topic, message);
        console.log('published to Topic: ' + topic + " with Message: " + message);
    }, 1000);
});

function pollDevice()
{
    return Math.floor(Math.random() * 100) + 1;
}