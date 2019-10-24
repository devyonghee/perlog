const Observer = class {
    constructor(socket, target) {
        this.socket = socket;
        this.target = target;
    }

    isSame(socket) {
        return this.socket === socket;
    }

    notify(message) {
        this.socket.emit('log', this.target, message);
    }
};

module.exports = Observer;