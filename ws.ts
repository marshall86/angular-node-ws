#!/usr/bin/env node
const WebSocketServer = require('websocket').server;
const http = require('http');
const unirest = require("unirest");
const API_KEY = "";

const server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8080, () => {
    console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', (request) => {

    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    const connection = request.accept('api', request.origin);
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', (message) => {
        getStocksQuotes(message.utf8Data);
    });

    connection.on('close', (reasonCode, description) => {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

    function getStocksQuotes(stocks) {

        stocks = stocks.replace(/"/g, '');

        const req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes");

        req.query({
            "region": "US",
            "symbols": stocks
        });

        req.headers({
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "useQueryString": true
        });

        req.end((res) => {
            if (res.body.error) throw new Error(res.error);
            connection.sendUTF(JSON.stringify(res.body.quoteResponse));
        });

    }

});