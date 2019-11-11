const Server = require('./Server');
const File = require('./File');
const Observer = require('./Observer');
const pathLib = require('path');
const jwt = require('jsonwebtoken');
const logger = require('./Logger');

const App = class {
    constructor(config) {
        this.config = config;
        this._defaultDirectory = pathLib.resolve(this.config.defaultDirectory || '/');
        this.files = [];
    }

    run() {
        if (!this.config.host || !this.config.port) return logger.info('not enough config');

        if (!!this._defaultDirectory && !this._availableDefaultPath()) return;

        const server = new Server(this.config.authUrl, this.config.secretKey);
        this.io = server.openSocket(this.config.host, this.config.port);
        this.io.use((socket, next) => {
            try {
                const { token } = socket.handshake.query;
                const decoded = jwt.verify(token, this.config.secretKey);
                logger.info(`${decoded.id} log in`);
                socket._id = decoded.id;
                next();
            } catch (e) {
                next(new Error(e.message));
            }
        });
        this._registerEvents();
    }

    _registerEvents() {
        this.io.sockets.on('connection', socket => {
            socket.on('watch', (target, path) => this._watch(target, path, socket));
            socket.on('forget', path => {
                logger.info(`${socket._id} request forgetting ${path}`);
                this._forget(path, socket)
            });
            socket.on('search', path => this._search(path, socket));
            socket.on('disconnecting', () => {
                logger.info(`${socket._id} is disconnected`);

                this.files = this.files.filter(file => {
                    file.removeBySocket(socket);
                    if (!file.isNotWatching()) return true;
                    logger.info(`${file.path} is forgotten`);
                    return false;
                });
            });
        });
    }

    _search(searchPath, socket) {
        try {
            const newSearchPath = (!searchPath) ? this._defaultDirectory : this._replacePath(searchPath);
            if (!newSearchPath) {
                logger.info('path is not exist');
                return socket.emit('fileError', searchPath, '오류가 발생했습니다.');
            }

            logger.info(`${socket._id} searching ${newSearchPath}`);
            const file = new File(newSearchPath);
            const files = file.search();
            socket.emit('searched', files);
        } catch (e) {
            logger.info(e.message);
            socket.emit('fileError', searchPath, '오류가 발생했습니다.');
        }
    }

    _watch(target, requestPath, socket) {
        logger.info(`${socket._id} request watching ${requestPath}`);
        const path = this._replacePath(requestPath);

        if (!path) return socket.emit('fileError', requestPath, '경로가 잘못 되었습니다.');

        const observer = new Observer(socket, target);

        try {
            let file = this.files.find(file => file.isSame(path));

            if (!file) {
                file = new File(path);
                this.files.push(file);
                file.watch();
            }

            file.register(observer);
        } catch (e) {
            logger.info(e.message);
            socket.emit('fileError', requestPath, e.message);
        }

    }

    _forget(path, socket) {
        const file = this.files.find(file => file.isSame(path));
        if (!file) return;

        file.removeBySocket(socket);
        if (file.isNotWatching()) {
            this.files.splice(this.files.indexOf(file), 1);
            logger.info(`${path} is forgotten`);
        }
    }

    _replacePath(path) {
        const slicedPath = pathLib.resolve(path).slice(0, this._defaultDirectory.length);
        if (slicedPath !== this._defaultDirectory) {
            logger.info(`${path} is bad path`);
            return '';
        }

        const restPath = path.slice(this._defaultDirectory.length);
        const filteredPaths = restPath.split('/').filter(String);
        if (filteredPaths.includes('..')) {
            logger.info(`${path} is bad path`);
            return '';
        }

        const newPath = filteredPaths.join('/');
        return pathLib.join(this._defaultDirectory, newPath);
    }

    _availableDefaultPath() {
        try {
            const files = (new File(pathLib.resolve(this._defaultDirectory))).search();
            return !!files;
        } catch (e) {
            logger.info(`${this._defaultDirectory} is not available default directory`, e.message);
            return false;
        }
    }
};

const config = require('./config/server');
File.availableExt = config.extensions;
const logServer = new App(config);
logServer.run();