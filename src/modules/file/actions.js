const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
const REMOVE_DIRECTORY = Symbol('REMOVE_DIRECTORY');
const ADD_FILE = Symbol('ADD_FILE');
const REMOVE_FILE = Symbol('REMOVE_FILE');

export const types = {
    ADD_DIRECTORY,
    REMOVE_DIRECTORY,
    ADD_FILE,
    REMOVE_FILE,
};

const addDirectory = (name, parent = null) => {
    return {
        type: ADD_DIRECTORY,
        name,
        parent
    };
};

const addFile = (file, parent = null) => {
    return {
        type: ADD_FILE,
        file,
        parent
    };
};

const remove = file => {
    return {
        type: ADD_FILE,
        file,
    };
};

export default {
    addDirectory,
    addFile,
    remove
};