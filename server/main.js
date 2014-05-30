var	http = require('http');
var express = require('express');
var app = express();
var config = require('./config');
var configure_middleware = require('./config/middleware');
var configure_routes = require('./config/routes');

configure_middleware(app);
configure_routes(app);

httpServer = http.createServer(app)
httpServer.listen(config.http_port);