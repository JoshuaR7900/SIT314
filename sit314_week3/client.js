const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://3.122.93.61:1883")

var topic="/JJR7900";
var message="Apples";

client.on('connect', () =>
{
    console.log('mqtt connected');
    client.publish(topic, message);
    console.log('published to Topic: ' + topic + " with message: " + message);
});
