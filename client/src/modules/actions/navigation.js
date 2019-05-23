const SET_SELECT_TARGET = Symbol('SET_SELECT_TARGET');
const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
const REMOVE_DIRECTORY = Symbol('REMOVE_DIRECTORY');
const ADD_FILE = Symbol('ADD_FILE');
const REMOVE_FILE = Symbol('REMOVE_FILE');
const SET_WATCH = Symbol('SET_WATCH');
const SET_FORGET = Symbol('SET_FORGET');
const SET_ALL_FORGET = Symbol('SET_ALL_FORGET');

export const types = {
    SET_SELECT_TARGET,
    ADD_DIRECTORY,
    REMOVE_DIRECTORY,
    ADD_FILE,
    REMOVE_FILE,
    SET_WATCH,
    SET_FORGET,
    SET_ALL_FORGET,
};

const setSelectTarget = file => {
    return {
        type: SET_SELECT_TARGET,
        file
    };
};

const addDirectory = (name) => {
    return {
        type: ADD_DIRECTORY,
        name,
    };
};

const removeDirectory = () => {
    return {
        type: REMOVE_DIRECTORY,
    };
};


const addFile = file => {
    return {
        type: ADD_FILE,
        file,
    };
};

const removeFile = () => {
    return {
        type: REMOVE_FILE,
    };
};

const setWatch = (file, watch) => {
    return {
        type: SET_WATCH,
        file,
        watch
    };
};

const setAllForget = () => {
    return {
        type: SET_ALL_FORGET,
    };
};

export default {
    setSelectTarget,
    addDirectory,
    removeDirectory,
    addFile,
    removeFile,
    setWatch,
    setAllForget
};

