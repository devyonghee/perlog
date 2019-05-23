import io from 'socket.io-client';
import newFileActions from './newFile';
import directoryActions from './navigation';
import messageActions from './message';

const SET_SOCKET = Symbol('SET_SOCKET');
const RESET_SOCKET = Symbol('RESET_SOCKET');
const SET_DIRECTORY = Symbol('SET_DIRECTORY');
const REQUEST_WATCH = Symbol('REQUEST_WATCH');
const SEARCH = Symbol('SEARCH');

export const types = {
    SET_SOCKET,
    RESET_SOCKET,
    SET_DIRECTORY,
    REQUEST_WATCH,
    SEARCH
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

const requestWatch = (file, watch) => {
    return {
        type: REQUEST_WATCH,
        file,
        watch,
    };
};

const search = (path = '') => {
    return {
        type: SEARCH,
        path
    };
};


const connectServer = url => {
    return dispatch => {
        const socket = io.connect(url);
        socket.on('connect', () => dispatch(setSocket(socket)));

        socket.on('log', (file, message) => dispatch(messageActions.addMessage(file, message)));

        socket.on('fileError', (file, message) => {
            dispatch(directoryActions.setWatch(file, false));
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

export default {
    connectServer,
    disconnectServer,
    requestWatch,
    search
}