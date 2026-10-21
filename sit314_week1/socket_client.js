//socket_client.py
const net = require("net");

const host = "127.0.0.1";
const port = 6000;

const client = net.createConnection(port, host, () => {
    console.log("Connected");
    setInterval(() => {
        RNG = Math.floor(Math.random() * 100) + 1;
        S = String(RNG);
        client.write("add," + RNG + ",42.4");
        //client.write('multiply,10,10');
        //client.write('divide,100,10');
    }, 1
    ); // In milliseconds
});

client.on("data", (data) => {
    console.log(`Received: ${data}`);
    // process.exit(0);
});

client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
});

client.on("close", () => {
    console.log("Connection closed");
});
