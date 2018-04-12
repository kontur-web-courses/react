var path = require('path');
var tasks = require('./tasks').tasks;


var entries = {};
var rewrites = [];
for (var k in tasks) {
    addTask(tasks[k].order, tasks[k].id);
}

function addTask(order, id) {
    var orderAndId = order + '.' + id;
    entries[id] = ['./src/' + orderAndId + '/index.js'];
    rewrites.push({
        from: new RegExp('^\/('+ orderAndId.replace(/\./, '\\.') + ')|(' + order + ')$', 'i'),
        to: '/src/'+ orderAndId +'/index.html'
    });
}

module.exports = {
    entry: entries,
    output: {
        path: path.resolve('build'),
        publicPath: 'build',
        filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: {
            rewrites: rewrites,
        },
    }
};
