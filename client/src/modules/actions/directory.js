const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
const REMOVE_DIRECTORY = Symbol('REMOVE_DIRECTORY');
const ADD_FILE = Symbol('ADD_FILE');
const REMOVE_FILE = Symbol('REMOVE_FILE');
const SET_WATCH = Symbol('SET_WATCH');
const SET_FORGET = Symbol('SET_FORGET');
const SET_ALL_FORGET = Symbol('SET_ALL_FORGET');

export const types = {
    ADD_DIRECTORY,
    REMOVE_DIRECTORY,
    ADD_FILE,
    REMOVE_FILE,
    SET_WATCH,
    SET_FORGET,
    SET_ALL_FORGET,
};

const addDirectory = (name) => {
    return {
        type: ADD_FILE,
        name
    };
};

const removeDirectory = (name) => {
    return {
        type: REMOVE_DIRECTORY,
        name
    };
};


const addFile = (path) => {
    return {
        type: ADD_FILE,
        path
    };
};

const removeFile = (path) => {
    return {
        type: REMOVE_FILE,
        path
    };
};

const setWatch = (path) => {
    return {
        type: SET_WATCH,
        path
    };
};

const setForget = (path) => {
    return {
        type: SET_FORGET,
        path
    };
};

const setAllForget = () => {
    return {
        type: SET_FORGET,
    };
};

export default {
    addDirectory,
    removeDirectory,
    addFile,
    removeFile,
    setWatch,
    setForget,
    setAllForget
};

