const SET_SOCKET = Symbol('SET_SOCKET');
const RESET_SOCKET = Symbol('RESET_SOCKET');
const REQUEST_WATCH = Symbol('REQUEST_WATCH');
const SEARCH = Symbol('SEARCH');
const SET_FILES = Symbol('SET_FILES');
const ADD_MESSAGE = Symbol('ADD_MESSAGE');
const SET_ERROR_FILE = Symbol('SET_ERROR_FILE');

export const types = {
    SET_SOCKET,
    RESET_SOCKET,
    REQUEST_WATCH,
    SEARCH,
    SET_FILES,
    ADD_MESSAGE,
    SET_ERROR_FILE
};

const setSocket = (name, socket) => {
    return {
        type: SET_SOCKET,
        name,
        socket
    };
};

const resetSocket = () => {
    return {
        type: RESET_SOCKET,
    };
};

const requestWatch = (file, watch) => {
    return {
        type: REQUEST_WATCH,
        file,
        watch,
    };
};

const search = (directory = null) => {
    return {
        type: SEARCH,
        directory
    };
};

const setFiles = (path, files) => {
    return {
        type: SET_FILES,
        path,
        files,
    };
};

const addMessage = (path, message) => {
    return {
        type: ADD_MESSAGE,
        path,
        message
    };
};

const setErrorFile = path => {
    return {
        type: SET_ERROR_FILE,
        path,
    };
};

export default {
    setSocket,
    resetSocket,
    setFiles,
    requestWatch,
    search,
    addMessage,
    setErrorFile
}