const express = require('express');
const http = require('http');
const https = require('https');
const io = require('socket.io');

const Client = class {
    constructor(config, server) {
        this.config = config;
        this.server = server;
        this.socket = null
    }

    listen() {
        if (!this.config.host || !this.config.port) return this.server.log('client has not enough config');
        const httpServer = this._createServer();
        const socket = io(httpServer.listen(this.config.port, this.config.host));

        socket.sockets.on('connection', socket => {
            this.socket = socket;
            this.socket.on('data', (type, path) => this.server.notify(type, path));
        });
    }

    request(type, from, ...args) {
        if (!this.socket) return this.server.log('client has not socket');
        this.server.log(`${type} ${from} ${args.join(',')}`, 'debug');
        this.socket.emit(`@${type}`, from, ...args);
    }

    _createServer() {
        return (!!this.config.ssl) ? https.createServer({
            key: fs.readFileSync(this.config.ssl.key),
            cert: fs.readFileSync(this.config.ssl.cert)
        }, express()) : http.createServer(express());
    }
};

module.exports = Client;