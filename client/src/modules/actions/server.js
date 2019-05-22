import io from 'socket.io-client';
import newFileActions from './newFile';
import directoryActions from './directory';
import messageActions from './message';

const SET_SOCKET = Symbol('SET_SOCKET');
const RESET_SOCKET = Symbol('RESET_SOCKET');
const SET_DIRECTORY = Symbol('SET_DIRECTORY');

export const types = {
    SET_SOCKET,
    RESET_SOCKET,
    SET_DIRECTORY
};

const setSocket = socket => {
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

const setDirectory = path => {
    return {
        type: SET_DIRECTORY,
        path
    };
};


const connectServer = url => {
    return dispatch => {
        const socket = io.connect(url);
        socket.on('connect', () => dispatch(setSocket(socket)));

        socket.on('log', (path, message) => dispatch(messageActions.addMessageOfWatchedFile(path, message)));

        socket.on('fileError', (path, message) => {
            dispatch(directoryActions.setForget(path));
            window.remote.dialog.showErrorBox('파일이 존재하지 않습니다.', message);
        });

        socket.on('searched', (path, files) => {
            dispatch(newFileActions.setFiles(path, files));
        });

        socket.on('error', (path, message) => {
            window.remote.dialog.showErrorBox('서버와의 연결이 끊겼습니다.', message);
            dispatch(directoryActions.setAllForget());
        });
    }
};

const disconnectServer = () => {
    return (dispatch, getState) => {
        const {server: {socket}} = getState();
        if (!!socket) socket.disconnect();
        dispatch(resetSocket);
        dispatch(directoryActions.setAllForget());
    }
};


const watch = path => {
    return (dispatch, getState) => {
        const {server: {socket}} = getState();
        if (!socket) return;
        socket.emit('watch', path);
        dispatch(directoryActions.setWatch(path));
    }
};

const forget = path => {
    return (dispatch, getState) => {
        const {server: {socket}} = getState();
        if (!socket) return;
        socket.emit('forget', path);
        dispatch(directoryActions.setForget(path));
    }
};


const search = (path = '') => {
    return (dispatch, getState) => {
        const {server: {socket}} = getState();
        if (!socket) return;
        socket.emit('search', path);
    }
};


export default {
    connectServer,
    disconnectServer,
    watch,
    forget,
    search
}