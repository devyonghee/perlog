const ADD_SERVER = Symbol('ADD_SERVER');
const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
const EXTEND_TARGET = Symbol('EXTEND_TARGET');
const REMOVE_DIRECTORY = Symbol('REMOVE_DIRECTORY');
const ADD_FILE = Symbol('ADD_FILE');
const REMOVE_FILE = Symbol('REMOVE_FILE');

export {
    ADD_SERVER,
    ADD_DIRECTORY,
    EXTEND_TARGET,
    REMOVE_DIRECTORY,
    ADD_FILE,
    REMOVE_FILE,
};

const addServer = (name, url) => {
    return {
        type: ADD_SERVER,
        name, url
    };
};

const addDirectory = (name, target) => {
    return {
        type: ADD_DIRECTORY,
        name, target
    };
};

const addFile = (file, target) => {
    return {
        type: ADD_FILE,
        file, target
    };
};

const remove = file => {
    return {
        type: REMOVE_FILE,
        file,
    };
};

const extend = index => {
    return {
        type: EXTEND_TARGET,
        index
    }
};

export default {
    addServer,
    addDirectory,
    addFile,
    extend,
    remove
};