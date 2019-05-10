const LogFile = require('./LogFile');

const Server = class {
    constructor(config) {
        this.config = config;
        this.files = {};
    }

    run() {
        if (!this.config.host || !this.config.port) return console.log('client has not enough config');

        const app = require('express')();
        const server = require('http').createServer(app).listen(this.config.port, this.config.host);
        this.io = require('socket.io')(server);

        app.get('/', function (req, res) {
            res.send('<script src="/socket.io/socket.io.js"></script><script>' +
                ' var socket = io();' +
                'socket.on("message", data=>console.log(data));' +
                '</script>')
        });

        this._registerEvents();
    }

    _registerEvents() {
        this.io.sockets.on('connection', socket => {
            console.log(`${socket.id} is connected`);

            socket.on('watch', path => this._watch(path, socket));
            socket.on('forget', path => this._forget(path, socket));
            socket.on('disconnect', () => {
                console.log(`${socket.id} is disconnected`);
                Object.keys(socket.rooms).map(path => this._forget(path, socket))
            });
        });
    }

    _watch(path, socket) {
        socket.join(path, () => {
            if (!!this.files[path]) return;

            try {
                this.files[path] = (new LogFile(path, message => this.io.sockets.to(path).emit('log', message))).watch();
            } catch (e) {
                console.log(e.message);
                socket.leave(path, () => this.io.sockets.to(path).emit('err', path));
            }
        });
    }

    _forget(path, socket) {
        socket.leave(path, () =>
            !this._isSomeoneWatching(path) &&
            this.files.hasOwnProperty(path) &&
            this.files.forget() &&
            delete this.files[path] &&
            console.log(`${path} is forgotten`)
        );
    }

    _isSomeoneWatching(path) {
        console.log(Object.values(this.io.sockets.rooms));
        return Object.values(this.io.sockets).some(socket => {
            // console.log(socket.rooms);
            // socket.rooms.hasOwnProperty(path)
        });
    }
};

const config = require('./config');
const logServer = new Server(config);
logServer.run();