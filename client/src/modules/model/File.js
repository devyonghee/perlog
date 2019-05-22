function* generatorColor() {
    const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow'];
    let index = 0;
    while (true) {
        if (!colors[index]) index = 0;
        yield colors[index++];
    }
}

const colors = generatorColor();

const File = class {
    constructor(name, path, isDirectory = false) {
        this.name = name;
        this.path = path.replace(/(\\+|\/+)/g, '/').replace(/(\/$)/g, '');
        this.isDirectory = isDirectory;
        this.watched = false;
        this.isExtended = false;
        this.child = [];
    }

    extend(){
        this.isExtended = true;
        return this;
    }

    shrink() {
        this.isExtended = false;
        return this;
    }

    watch() {
        this.watched = true;
        return this;
    }

    forget() {
        this.watched = false;
        return this;
    }

    is(file) {
        return (this.path === file.path);
    }

    setColor(color = '') {
        this.color = color || colors.next().value;
    }

    setChild(children) {
        this.child = children;
        return this.child;
    }
};

export default File;