const http = require('http');

setInterval(loadtest, 100); //time is in ms
function loadtest()
{
    http.get('http://newLoadBalancer-1968023817.us-east-1.elb.amazonaws.com:3000', (res) => {
      res.on('data', function (chunk) {
        console.log('' + chunk);
    });
    });
}