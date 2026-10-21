const net = require("net");
const port = 6000;

let temp;
let wind;
let rain;
let weatherArray = Array.from({ length: 10 }, () => Array(10).fill(0));
weatherArray[1][0] = "Mallee";
weatherArray[2][0] = "Wimmera";
weatherArray[3][0] = "South West";
weatherArray[4][0] = "Northern Country";
weatherArray[5][0] = "North Central";
weatherArray[6][0] = "Central";
weatherArray[7][0] = "North East";
weatherArray[8][0] = "East Gippsland";
weatherArray[9][0] = "West and South Gippsland";

const server = net.createServer((socket) => {
    console.log("Client connected");

    socket.on("data", (data) => {
        const strData = data.toString();
        console.log(`Received: ${strData}`);

        const command = strData.split(",");
        const name = command[0];
        let value; 
        if (name != "fire")
        {
            value = parseFloat(command[1]);
        }
        else
        {
            value = command[1];
        }

        area = command[2];

        let result;
        let areaIndex;
	    console.log("Name recieved: " + name);
	    console.log("Value recieved: " + value);
        console.log("Area recieved: " + area);

        switch (area)
        {
            case "Mallee":
                areaIndex = 1;
                break;
            case "Wimmera":
                areaIndex = 2;
                break;
            case "South West":
                areaIndex = 3;
                break;
            case "Northern Country":
                areaIndex = 4;
                break;
            case "North Central":
                areaIndex = 5;
                break;
            case "Central":
                areaIndex = 6;
                break;
            case "North East":
                areaIndex = 7;
                break;
            case "East Gippsland":
                areaIndex = 8;
                break;
            case "West and South Gippsland":
                areaIndex = 9;
                break;
        }

        console.log("Area Index: " + areaIndex);

        switch (name) {
            case "fire":
                console.log(value);
                result = "ok";
                weatherArray[areaIndex][1] = value;
                break;
            case "temp":
                console.log(value);
		        temp = value;
		        result = "ok";
                weatherArray[areaIndex][2] = value;
                break;
            case "rain":
                console.log(value);
		        rain = value;
                result = "ok";
                weatherArray[areaIndex][3] = value;
                break;
            case "wind":
                console.log(value);
		        wind = value;
		        result = "ok";
                weatherArray[areaIndex][4] = value;
                break;
            case "request":
                console.log(value);
                console.log("Saved Temp: " + weatherArray[areaIndex][2]);
                console.log("Saved Rain: " + weatherArray[areaIndex][3]);
                console.log("Saved Wind: " + weatherArray[areaIndex][4]);
                console.log("Saved Fire: " + weatherArray[areaIndex][1]);
		        if(weatherArray[areaIndex][2] > 20 && weatherArray[areaIndex][3] < 50 && weatherArray[areaIndex][4] > 30 || (weatherArray[areaIndex][1] == "MODERATE" || weatherArray[areaIndex][1] == "HIGH" || weatherArray[areaIndex][1] == "EXTREME" || weatherArray[areaIndex][1] == "CATASTROPHIC")){
		            result = "Weather Warning for " + area;
		}
		else
		   result = "Everything fine for " + area;
                break;
        }
        socket.write(result.toString());
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.log(`Socket Error: ${error.message}`);
    });
});

server.on("error", (error) => {
    console.log(`Server Error: ${error.message}`);
});

server.listen(port, () => {
    console.log(`TCP socket server is running on port: ${port}`);
});

