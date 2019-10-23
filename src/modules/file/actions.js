export const ADD_SERVER = Symbol('ADD_SERVER');
export const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
export const SET_WATCH = Symbol('SET_WATCH');
export const TOGGLE_EXTEND = Symbol('TOGGLE_EXTEND');
export const SET_NEW_FORM = Symbol('SET_NEW_FORM');
export const SELECT_INDEX = Symbol('SELECT_INDEX');
export const ADD_FILE = Symbol('ADD_FILE');
export const REMOVE_FILE = Symbol('REMOVE_FILE');

const addServer = (name, url) => {
    return {
        type: ADD_SERVER,
        name, url
    };
};

const addDirectory = (name) => {
    return {
        type: ADD_DIRECTORY,
        name
    };
};

const addFile = (file) => {
    return {
        type: ADD_FILE,
        file
    };
};

const setWatch = (index, watch) => {
    return {
        type: SET_WATCH,
        index, watch
    };
};

const selectIndex = (index) => {
    return {
        type: SELECT_INDEX,
        index
    };
};

const remove = () => {
    return {
        type: REMOVE_FILE,
    };
};

const toggleExtend = (extend = null) => {
    return {
        type: TOGGLE_EXTEND,
        extend
    };
};

const setNewForm = (open, newType = '') => {
    return {
        type: SET_NEW_FORM,
        open, newType
    };
};

export default {
    addServer,
    addDirectory,
    addFile,
    setWatch,
    toggleExtend,
    setNewForm,
    selectIndex,
    remove
};