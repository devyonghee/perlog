import axios from 'axios';
import io from 'socket.io-client';
import { removeServerToken, saveServer } from '../storage';
import userActions from '../user/actions';
import fileActions from '../file/actions';
import { SERVER } from '../utils';

const ipcRenderer = window.require('electron').ipcRenderer;

export const ADD_SERVER = Symbol('ADD_SERVER');
export const SET_SOCKET = Symbol('SET_SOCKET');
export const REMOVE_SOCKET = Symbol('REMOVE_SOCKET');
export const SET_SERVER_INFO = Symbol('SET_SERVER_INFO');
export const RESET_SOCKET = Symbol('RESET_SOCKET');
export const REQUEST_WATCH = Symbol('REQUEST_WATCH');
export const SEARCH = Symbol('SEARCH');
export const SET_FILES = Symbol('SET_FILES');
export const ADD_MESSAGE = Symbol('ADD_MESSAGE');
export const TOGGLE_EXTEND = Symbol('TOGGLE_EXTEND');

const addServer = (name, url) => {
    return {
        type: ADD_SERVER,
        url, name
    };
};

const setSocket = (url, socket) => {
    return {
        type: SET_SOCKET,
        url, socket
    };
};

const removeSocket = (socket = null, index = -1) => {
    return {
        type: REMOVE_SOCKET,
        socket, index
    };
};

const setServerInfo = (values) => {
    return {
        type: SET_SERVER_INFO,
        values
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

const setFiles = (server, files, parent = null) => {
    return {
        type: SET_FILES,
        server,
        files,
        parent
    };
};

const toggleExtend = (server, file, extend = null) => {
    return {
        type: TOGGLE_EXTEND,
        server, file, extend
    }
};

const registerEvent = (url, socket) => dispatch => {
    socket.on('connect', () => {
        dispatch(setSocket(url, socket));
    });

    // socket.on('searched', (path, files) => dispatch(setFiles(path, files)));
    socket.on('log', (path, message) => dispatch(addMessage(path, message)));
    socket.on('fileError', (path, message) => ipcRenderer.send('notice', message));

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

const getSelectedServer = (file, servers) => {
    if (!file) return null;
    if (file.type === SERVER) return servers.find(server => server.url === file.url);
    if (file.parent) return getSelectedServer(file.parent, servers);
    return null;
};

const search = (parent = null) => (dispatch, getState) => {
    const { file, server: serverState } = getState();
    if (!file.selected) return;
    const server = getSelectedServer(file.selected, serverState.servers);
    if (!server || !server.socket) return;

    server.socket.once('searched', files => dispatch(setFiles(server, files, parent)));
    server.socket.emit('search', parent ? parent.path : '');
};

const connectAndRegister = (url, token) => dispatch => {
    const socket = io.connect(`${url}?token=${token}`, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 3,
    });

    saveServer(url, token);
    dispatch(registerEvent(url, socket));
};

const connectByToken = (url, token) => async dispatch => {
    try {
        const response = await axios.post(url + '/login', { token });
        if (response.status !== 200) {
            return ipcRenderer.send('notice', '서버 오류');
        }
        dispatch(connectAndRegister(url, response.data));
        dispatch(setServerInfo({ token }));
    } catch (e) {
        removeServerToken(url);
        ipcRenderer.send('notice', '토큰이 만료되었습니다.');
    }
};

const connect = (url, name) => async (dispatch, getState) => {
    const { id, password } = getState().user;
    dispatch(setServerInfo({ loading: true }));

    try {
        const response = await axios({ url, method: 'HEAD' });
        if (response.status !== 200) return ipcRenderer.send('notice', '연결할 수 없습니다.');

        if (!id || !password) {
            dispatch(addServer(name, url));
            dispatch(setServerInfo({ openNewServer: false, tempUrl: url }));
            dispatch(fileActions.addServer(name, url));
            return dispatch(userActions.setUserInfo({ openLogin: true }));
        }

        await dispatch(userActions.login(id, password, url));
        dispatch(setServerInfo({ openNewServer: false }));
    } catch {
        ipcRenderer.send('notice', '연결할 수 없습니다.');
    } finally {
        dispatch(setServerInfo({ loading: false }));
    }
};

export default {
    setSocket,
    setServerInfo,
    resetSocket,
    setFiles,
    requestWatch,
    search,
    toggleExtend,
    connect,
    connectAndRegister,
    connectByToken
};