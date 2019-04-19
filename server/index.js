const winston = require('winston');
const Client = require('./Client');
const LogFile = require('./LogFile');

const Server = class {
    constructor(config) {
        this.client = new Client(config, this);
        this._file = new Map();

        this._logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.printf(({message}) => String(message)),
                winston.format.colorize()
            ),
            transports: [new winston.transports.Console()]
        });
    }

    run() {
        this.client.listen();
    }

    log(message, type = 'error') {
        this._logger.log(type, message);
    }

    notify(type, ...args) {
        switch (type) {
            case 'watch' :
                return this._watch(args.shift());
            case 'forget' :
                return this._forget(args.shift());
            case 'lost' :
                break;

            case 'log' :
                const [path, log = ''] = args;
                this.client.request('log', path, log);
                break;
            case 'error' :

                break;
            default:
                break;
        }
    }

    _watch(path) {
        if (this._file.has(path)) {
            this.client.request('watched', path);
            return this._file.get(path).addWatcher();
        }

        const file = (new LogFile(path, this));

        if (!file.watch()) return this.client.request('fileError', path, `${path} Is Not Existed`);

        this.log(`Watching file: '${path}'`, 'info');
        this.client.request('watched', path);
        this._file.set(path, file);
    }

    _forget(path) {
        if (!this._file.has(path)) {
            this.client.request('error', path);
            return this.log(`${path} Is Not Watched`);
        }
        this.client.request('forgotten', path);
        const file = this._file.get(path);
        const watchers = file.removeWatcher();
        if (watchers > 0) return;

        if (file.forget()) this.log(`${path} is close`);
        this._file.delete(path);
    }
};

const config = require('./config');
const logServer = new Server(config);
logServer.run();