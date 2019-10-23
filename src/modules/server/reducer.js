import {
    ADD_SERVER,
    REMOVE_SOCKET,
    REQUEST_WATCH, SELECT_SERVER,
    SET_FILES,
    SET_SERVER_INFO,
    SET_SOCKET,
    TOGGLE_EXTEND
} from './actions';
import { changeChildValue, changeValue, DIRECTORY, FILE, findByIndex } from '../utils';

const initialState = {
    servers: [],
    files: [],
    watchedFiles: [],
    tempUrl: '',
    openNewServer: false,
    loading: false,
    selectedServer: -1,
    selectedFile: [],
};

const setSocket = (state, { url, socket }) => {
    const replaceUrl = url => url.trim().toLowerCase().replace('\/', '');
    const serverIndex = state.servers.findIndex(server => replaceUrl(server.url) === replaceUrl(url));
    if (serverIndex < 0) return state;

    return {
        ...state,
        servers: changeValue(serverIndex)({ socket })(state.servers)
    };
};

const removeSocket = (state, { socket }) => {
    const serverIndex = state.servers.findIndex(server => server.socket === socket);
    if (serverIndex< 0) return state;

    const stateSocket = state.servers[serverIndex].socket;
    if (stateSocket) stateSocket.disconnect();

    return {
        ...state,
        servers: changeValue(serverIndex)({ socket: null })(state.servers)
    };
};

const setFiles = (state, { files, index = [] }) => {
    const findFile = findByIndex(index)(state.files);

    const newFiles = (Array.isArray(files) && files.length) ? files.map(file => ({
        name: file.name,
        path: file.path,
        type: file.isDirectory ? DIRECTORY : FILE,
        child: [],
        extended: false
    })) : null;

    return {
        ...state,
        files: findFile ? changeChildValue(index)({ child: newFiles })(state.files) : newFiles
    };
};

const applyWatchingFile = (state, { file, watch }) => {
    if (!state.socket || !file || file.isDirectory || !file.path) return state;
    const { watchedFiles } = state;
    if (watch) {
        !watchedFiles.includes(file) && watchedFiles.push(file);
        state.socket.emit('watch', file.path);
    } else {
        state.socket.emit('forget', file.path);
        watchedFiles.includes(file) && watchedFiles.splice(watchedFiles.indexOf(file), 1);
    }

    return { ...state, watchedFiles: [...watchedFiles] };
};

const toggleExtend = (state, { extend = null }) => {
    const selectedIndex = state.selectedFile;

    const file = findByIndex(selectedIndex)(state.files);
    const newExtended = (extend !== null) ? extend : !file.extended;
    return {
        ...state,
        files: changeChildValue(selectedIndex)({ extended: newExtended })(state.files)
    };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SERVER:
            return {
                ...state,
                servers: [
                    ...state.servers,
                    {
                        url: action.url,
                        name: action.name,
                        socket: null,
                        token: '',
                        files: [],
                    }]
            };

        case SET_SOCKET:
            return setSocket(state, action);

        case REMOVE_SOCKET:
            return removeSocket(state, action);

        case SET_FILES:
            return setFiles(state, action);

        case REQUEST_WATCH:
            return applyWatchingFile(state, action);

        case TOGGLE_EXTEND:
            return toggleExtend(state, action);

        case SET_SERVER_INFO:
            return {
                ...state,
                ...Object.entries(action.values).reduce((newInfos, [key, value]) => {
                    if (state.hasOwnProperty(key)) newInfos[key] = value;
                    return newInfos;
                }, {})
            };

        default:
            return state;
    }
}