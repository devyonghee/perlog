import axios from 'axios';
import io from 'socket.io-client';
import { removeServerToken, saveServer } from '../storage';
import userActions from '../user/actions';

const ipcRenderer = window.require('electron').ipcRenderer;

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
        dispatch(setSocket(socket));
    });

    socket.on('searched', (path, files) => dispatch(setFiles(path, files)));
    socket.on('log', (path, message) => dispatch(addMessage(path, message)));
    socket.on('fileError', (path, message) => {
        ipcRenderer.send('notice', message);
        setErrorFile(path);
    });

    socket.on('disconnect', reason => {
        ipcRenderer.send('notice', reason);
        dispatch(resetSocket());
    });

    socket.on('reconnect_failed', () => {
        ipcRenderer.send('notice', '서버와의 연결이 끊겼습니다.');
        dispatch(resetSocket());
    });

    socket.on('error', (path, message) => {
        ipcRenderer.send('notice', message, '서버와의 연결이 끊겼습니다.');
        dispatch(resetSocket());
    });
};

const connectWithRRegisterEvent = (url, token) => {
    return (dispatch) => {
        const socket = io.connect(`${url}?token=${token}`, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 3,
        });

        saveServer(url, token);
        registerEvent(socket, dispatch);
    };
};

const connect = (url, id, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(url + '/login', { id, password });
            if (response.status !== 200) {
                return ipcRenderer.send('notice', '서버 오류');
            }
            connectWithRRegisterEvent(url, response.data)(dispatch);
            dispatch(userActions.setLoginInfo(id, password));
        } catch (e) {
            const message = e.response && e.response.status === 401 ? '그룹웨어 계정을 확인해주세요' : e.message;
            ipcRenderer.send('notice', message);
        }
    };
};

const connectByToken = (url, token) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(url + '/login', { token });
            if (response.status !== 200) {
                return ipcRenderer.send('notice', '서버 오류');
            }
            connectWithRRegisterEvent(url, response.data)(dispatch);
        } catch (e) {
            removeServerToken(url);
            ipcRenderer.send('notice', '토큰이 만료되었습니다.');
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
    connect,
    connectByToken
};