const File = require('./File');
const pathLib = require('path');

const Server = class {
    constructor(config) {
        this.config = config;
        this._defaultDirectory = pathLib.resolve(this.config.defaultDirectory || '/');
        this.files = {}
    }

    run() {
        if (!this.config.host || !this.config.port) return console.log('client has not enough config');

        if (!!this._defaultDirectory && !this._availableDefaultPath()) return;
        const app = require('express')();
        const server = require('http').createServer(app).listen(this.config.port, this.config.host);
        this.io = require('socket.io')(server);

        console.log(`listening... ${this.config.host}:${this.config.port}`);
        this._registerEvents();
    }

    _registerEvents() {
        this.io.sockets.on('connection', socket => {
            console.log(`${socket.id} is connected`);

            socket.on('watch', path => this._watch(path, socket));
            socket.on('forget', path => this._forget(path, socket));
            socket.on('search', path => this._search(path, socket));
            socket.on('disconnecting', () => {
                console.log(`${socket.id} is disconnected`);
                Object.keys(socket.rooms).map(path => this._forget(path, socket))
            });
        });
    }

    _search(searchPath, socket) {
        try {
            const newSearchPath = (!searchPath) ? this._defaultDirectory : this._replacePath(searchPath);
            if (!newSearchPath) {
                console.log('path is not exist');
                return this.io.sockets.to(socket.id).emit('fileError', searchPath, ' 경로가 잘못 되었습니다.');
            }

            console.log('searching... ', newSearchPath);
            const file = new File(newSearchPath);
            const files = file.search();
            this.io.sockets.to(socket.id).emit('searched', newSearchPath, files);
        } catch (e) {
            console.log(e.message);
            this.io.sockets.to(socket.id).emit('fileError', searchPath, ' 경로가 잘못 되었습니다.');
        }
    }

    _watch(path, socket) {
        const replacedPath = this._replacePath(path);

        if (!replacedPath) return this.io.sockets.to(socket.id).emit('fileError', path, '경로가 잘못 되었습니다.');

        socket.join(replacedPath, () => {
            try {
                if (!!this.files[replacedPath]) return;

                const file = new File(replacedPath);
                file.watch().onChange(message => this.io.sockets.to(path).emit('log', replacedPath, message));

                this.files[replacedPath] =file;
            } catch (e) {
                console.log(e.message);
                this.io.sockets.to(socket.id).emit('fileError', path, e.message);
                socket.leave(replacedPath, () => null);
            }
        });

    }

    _forget(path, socket) {
        socket.leave(path, () =>
            this.files.hasOwnProperty(path) &&
            !this._isSomeoneWatching(path) &&
            this.files[path].forget() &&
            this.files[path].forget() &&
            delete this.files[path] &&
            console.log(`${path} is forgotten`)
        );
    }

    _isSomeoneWatching(path) {
        return (this.io.sockets.hasOwnProperty('adapter') &&
            this.io.sockets.adapter.hasOwnProperty('rooms') &&
            this.io.sockets.adapter.rooms.hasOwnProperty(path) &&
            !!this.io.sockets.adapter.rooms[path].length);
    }

    _replacePath(path) {
        const slicedPath = pathLib.resolve(path).slice(0, this._defaultDirectory.length);
        if (slicedPath !== this._defaultDirectory) {
            console.log(`${path} is bad path`);
            return '';
        }

        const restPath = path.slice(this._defaultDirectory.length);
        const filteredPaths = restPath.split('/').filter(String);
        if (filteredPaths.includes('..')) {
            console.log(`${path} is bad path`);
            return '';
        }

        const newPath = filteredPaths.join('/');
        return pathLib.join(this._defaultDirectory, newPath);
    }

    _availableDefaultPath() {
        try {
            (new File(pathLib.resolve(this._defaultDirectory))).search();
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }
};

const config = require('../config/server');
File.availableExt = config.extensions;
const logServer = new Server(config);
logServer.run();