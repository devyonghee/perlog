const fs = require('fs');
const pathLib = require('path');

const File = class {
    constructor(path) {
        this._path = path.replace(/\/*$/, '');
    }

    search() {
        if (!fs.existsSync(this._path)) throw new Error(`${this._path} file is not exist`);
        const files = fs.readdirSync(this._path, {encoding: 'utf8', withFileTypes: true});
        return files.map(file => {
            if (!file.isDirectory() && !File._isAvailableExt(file.name)) return null;

            return {
                name: file.name,
                path: pathLib.join(this._path, file.name),
                isDirectory: file.isDirectory()
            }
        }).filter(Boolean);
    }

    watch() {
        if (!fs.existsSync(this._path) || !File._isAvailableExt(this._path)) throw new Error(`${this._path} file can not watch`);

        this.preSize = fs.statSync(this._path).size;
        this.watching = fs.watch(this._path, event => this._registerWatchEvents(event));
        console.log(`${this._path} file is watching`);
        return this;
    }

    forget() {
        if (!!this.watching) {
            this.watching.close();
            return true;
        }
        console.log(`${this._path} file is not watching!!`);
        return false;
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
            data.split('\n').map(line => (!!line && typeof this.onChangeCallback === 'function' && this.onChangeCallback(line)))
        });
    }

    onChange(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
        return this;
    }

    static set availableExt(extensions) {
        this._availableExt = extensions
    }

    static _isAvailableExt(name) {
        if (!this._availableExt) return true;

        const index = name.lastIndexOf('.');
        if (index < 0) return false;
        const ext = name.slice(index + 1).toLowerCase();
        return this._availableExt.includes(ext);
    }
};

module.exports = File;