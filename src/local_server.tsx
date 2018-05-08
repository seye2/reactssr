import * as http from 'http';
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require("../webpack/webpack.config.dev.client.js");
const compiler = webpack(config);

import {app} from './app';
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
    log: false
}));

const port = 8080;
const server = http.createServer(app);
server.listen(port);

console.log(`listening onaaa http://localhost:${port}`);
