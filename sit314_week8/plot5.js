const plotlib = require('nodeplotlib')

const trace = {x : [ 1, 2, 3, 4 ], y : [ 1, 2, 3, 4 ],
                marker: {
                    color: ['green', 'purple'],
                    size: [40,10,20]},
                mode:'markers'};
plotlib.plot([trace]);