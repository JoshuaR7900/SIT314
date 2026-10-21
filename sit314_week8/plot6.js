const plotlib = require('nodeplotlib')

trace = {
    colorscale : 'Viridis',
    z : [[3,5,7,9],
        [ 21, 31, 8, 5]]
};

plotlib.plot('myDiv', [trace]);