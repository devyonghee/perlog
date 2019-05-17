import io from 'socket.io-client';
import directoryActions from './directory';
import messageActions from './message';

const SET_SOCKET = Symbol('SET_SOCKET');
const RESET_SOCKET = Symbol('RESET_SOCKET');
const REQUEST = Symbol('REQUEST');

export const types = {
    SET_SOCKET,
    RESET_SOCKET,
    REQUEST,
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

const request = (event, path) => {
    return {
        type: REQUEST,
        event,
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

        socket.on('error', (path, message) => {
            window.remote.dialog.showErrorBox('서버와의 연결이 끊겼습니다.', message);
            dispatch(directoryActions.setAllForget());
        });
    }
};


export default {
    connectServer,
    resetSocket,
    request
}