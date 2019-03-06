const fs = require('fs');

const LogFile = class {
    constructor(path, server) {
        this._path = path;
        this._server = server;
        this._watchers = 0;
    }

    addWatcher() {
        return ++this._watchers;
    }

    removeWatcher() {
        return --this._watchers;
    }

    watch() {
        if (!fs.existsSync(this._path)) return false;

        let preSize = fs.statSync(this._path).size;

        this.watching = fs.watch(this._path, event => {
            if (event === 'rename' || this._watchers <= 0) return this.forget();
            if (event !== 'change') return false;

            fs.stat(this._path, (error, stat) => {
                this._readLogs(stat.size, preSize);
                preSize = stat.size;
            })
        });

        ++this._watchers;
        return true;
    }

    forget() {
        return (this._watchers <= 0 && !!this.watching && this.watching.close());
    }

    _readLogs(curr, prev) {
        if (curr < prev) return;
        const readStream = fs.createReadStream(this._path, {encoding: 'utf8', start: prev, end: curr});
        readStream.on('data', data => {
            const lines = data.split('\n');
            lines.map(line => (!!line && this._server.notify('log', this._path, line)));
        })
    }
};

module.exports = LogFile;