import axios from 'axios';
import io from 'socket.io-client';

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

const setSocket = (socket) => {
    return {
        type: SET_SOCKET,
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

const registerEvent = (socket, dispatch) => {
    socket.on('connect', () => {
        // saveServer(url);
        dispatch(setSocket(socket));
    });

    socket.on('searched', (path, files) => setFiles(path, files));
    socket.on('log', (path, message) => addMessage(path, message));
    socket.on('fileError', (path, message) => {
        window.ipcRenderer.send('notice', message);
        setErrorFile(path);
    });

    socket.on('reconnect_failed', () => {
        window.ipcRenderer.send('notice', '서버와의 연결이 끊겼습니다.');
        dispatch(resetSocket());
    });

    socket.on('error', (path, message) => {
        window.ipcRenderer.send('notice', message, '서버와의 연결이 끊겼습니다.');
        dispatch(resetSocket());
    });
};

const connect = (url, id, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(url + '/login', { id, password });
            if (response.status !== 200) {
                return window.ipcRenderer.send('notice', '서버 오류');
            }

            const socket = io.connect(`${url}?token=${response.data}`, {
                transports: ['websocket'],
                reconnection: true,
                reconnectionAttempts: 3,
            });

            registerEvent(socket, dispatch);
        } catch (e) {
            const message = e.response && e.response.status === 401 ? '그룹웨어 계정을 확인해주세요' : e.message;
            window.ipcRenderer.send('notice', message);
        }
    };
};

export default {
    setSocket,
    resetSocket,
    setFiles,
    requestWatch,
    search,
    addMessage,
    setErrorFile,
    connect
};