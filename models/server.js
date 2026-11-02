// Express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();;
        this.port = process.env.PORT;

        // HTTP Server
        this.server = http.createServer(this.app);

        // Sockets configuration
        this.io = socketio(this.server, { /* Configurations */});

    }

    middlewares() {
        // Public directory deployment
        this.app.use(express.static(path.resolve(__dirname,  '../public')));
    }

    socketsConfiguration() {
        new Sockets(this.io);
    }

    execute() {
        // Midleware initialization
        this.middlewares();

        // Sockets initialization
        this.socketsConfiguration();

        // Server initialization
        this.server.listen(this.port, () => {
            console.log('Server is running on port: ',this.port)
        }
    )};
}

module.exports = Server;