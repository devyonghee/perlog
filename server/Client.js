
const Client = class {
    constructor(id) {
        this.id = id;
        this.files = [];
    }

    addWatchingFile(path) {
        this.files.push(path);
        return this;
    }

    isWatching(path) {
        return this.files.hasOwnProperty(path);
    }

    isId(id) {
        return this.id === id;
    }

    forgotFile() {

    }

    request(type, from, ...args) {
        if (!this.socket) return this.server.log('client has not socket');
        this.server.log(`${type} ${from} ${args.join(',')}`, 'debug');
        this.socket.emit(`@${type}`, from, ...args);
    }

    // _createServer() {
    //     return (!!this.config.ssl) ? https.createServer({
    //         key: fs.readFileSync(this.config.ssl.key),
    //         cert: fs.readFileSync(this.config.ssl.cert)
    //     }, express()) : http.createServer(express());
    // }
};

module.exports = Client;