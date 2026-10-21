const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://3.122.93.61:1883");

var topic="/JJR7900";

client.on('connect', () => 
{
    client.subscribe(topic);
    console.log('mqtt connected');
});

client.on('message', (topic, message) => 
{
    console.log("Topic is: " + topic);
    console.log("Message is: " + message);
});

