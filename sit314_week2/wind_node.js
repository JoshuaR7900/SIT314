const net = require("net");

const host = "127.0.0.1";
const port = 6000;

const client = net.createConnection(port, host, () => {
    console.log("Connected");
    setInterval(() => {
        const wind = Math.floor(Math.random() * 100) + 1;
        const areaNum = Math.floor(Math.random() * 9) + 1;


        area = "";

        switch (areaNum) {
            case 1:
		        area = "Mallee";
                break;
            case 2:
		        area = "Wimmera";
                break;
            case 3:
		        area = "South West";
                break;
            case 4:
                area = "Northern Country";
                break;
            case 5:
                area = "North Central";
                break;
            case 6:
                area = "Central";
                break;
            case 7:
                area = "North East";
                break;
            case 8:
                area = "East Gippsland";
                break;
            case 9:
                area = "West and South Gippsland";
                break;    
        }


	client.write(`wind,`+wind+","+area);
    }, 500); // Interval in milliseconds (2000ms = 2 seconds)
});

client.on("data", (data) => {
    console.log(`Received: ${data}`);
});

client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
});

client.on("close", () => {
    console.log("Connection closed");
});
