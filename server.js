/**
 * Created by ÏÊ on 23.09.2015.
 */
var express = require('express');
var io = require('socket.io');
var http =  require('http')
var app = express()
var server = http.createServer(app)

app.use(express.static('public'));


io = io.listen(server.listen(process.env.PORT || 3000));

require('./back/events')(io);

