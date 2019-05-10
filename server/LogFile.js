const fs = require('fs');

const LogFile = class {
    constructor(path, notify) {
        this._path = path;
        this._notify = notify;
        console.log(this._notify);
    }

    watch() {
        if (!fs.existsSync(this._path)) throw new Error(`${this._path} file is not exist`);

        this.preSize = fs.statSync(this._path).size;
        this.watching = fs.watch(this._path, event => this._registerWatchEvents(event));
        console.log(`${this._path} file is watching`);
        return this;
    }

    forget() {
        return (!!this.watching && this.watching.close());
    }

    _registerWatchEvents(event) {
        if (event === 'rename' || event !== 'change') {
            this.forget();
            throw new Error('File changed status');
        }

        fs.stat(this._path, (error, stat) => {
            this._readLogs(stat.size, this.preSize);
            this.preSize = stat.size;
        })
    }

    _readLogs(curr, prev) {
        if (curr < prev) return;
        const readStream = fs.createReadStream(this._path, {encoding: 'utf8', start: prev, end: curr});
        readStream.on('data', data => {
            console.log(data);
            data.split('\n').map(line => (!!line && this._notify(line)))
        });
    }

};

module.exports = LogFile;