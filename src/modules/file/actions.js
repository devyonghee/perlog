import { FILE, findByIndex, SERVER } from '../utils';
import serverActions from '../server/actions';

export const ADD_SERVER = Symbol('ADD_SERVER');
export const SET_TOKEN = Symbol('SET_TOKEN');
export const ADD_DIRECTORY = Symbol('ADD_DIRECTORY');
export const SET_WATCH = Symbol('SET_WATCH');
export const SET_EXTEND = Symbol('SET_EXTEND');
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

const setToken = (url, token) => {
    return {
        type: SET_TOKEN,
        url, token,
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

const remove = (index) => {
    return {
        type: REMOVE_FILE,
        index,
    };
};

const setNewForm = (open, newType = '') => {
    return {
        type: SET_NEW_FORM,
        open, newType
    };
};

const setExtend = (index = [], extend = null) => {
    return {
        type: SET_EXTEND,
        index,
        extend
    };
};

const openNewForm = (open, newType = '') => (dispatch, getState) => {
    const { file: { list, selectedIndex }, server: serverState } = getState();

    const file = findByIndex(selectedIndex.slice(0, 1))(list);
    if (file.type !== SERVER) return;
    const server = serverState.servers.find(server => server.url === file.url);

    if (server && server.socket) {
        dispatch(serverActions.search());
        return dispatch(setNewForm(open, newType));
    }

    file.token ? dispatch(serverActions.connectByToken(file.url, file.token)) : dispatch(serverActions.connect(file.url, file.name));
};

const toggleExtend = (index = [], extend) => (dispatch, getState) => {
    const { file: fileState, server: serverState } = getState();
    const file = findByIndex(index)(fileState.list);
    if (!file) return;

    if (file.type !== SERVER || !extend) return dispatch(setExtend(index, extend));

    const server = serverState.servers.find(server => server.url === file.url);
    if (server && server.socket) return dispatch(setExtend(index, extend));

    file.token ? dispatch(serverActions.connectByToken(file.url, file.token)) : dispatch(serverActions.connect(file.url, file.name));
};

const forgetAll = (file, socket) => {
    if (file.type === FILE && file.watch) {
        socket.emit('forget', file.path);
    }

    if (file.child && file.child.length) {
        file.child.map(childFile => forgetAll(childFile, socket));
    }
};

const deleteFile = (index) => (dispatch, getState) => {
    const { file: fileState, server: serverState } = getState();
    const rootFile = findByIndex(index.slice(0, 1))(fileState.list);
    if (!rootFile || rootFile.type !== SERVER) return;

    const server = serverState.servers.find(server => server.url === rootFile.url);
    if (server && server.socket) {
        const target = findByIndex(index)(fileState.list);
        forgetAll(target, server.socket);
    }
    dispatch(remove(index));
};

export default {
    addServer,
    addDirectory,
    addFile,
    setWatch,
    setNewForm,
    setExtend,
    setToken,
    toggleExtend,
    openNewForm,
    selectIndex,
    deleteFile
};