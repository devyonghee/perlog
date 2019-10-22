import {
    ADD_SERVER,
    ADD_MESSAGE,
    REQUEST_WATCH,
    SEARCH,
    SET_ERROR_FILE,
    SET_FILES,
    SET_SERVER_INFO,
    SET_SOCKET, REMOVE_SOCKET, TOGGLE_EXTEND
} from './actions';
import { changeMiddleValue, DIRECTORY, FILE } from '../utils';

const limitMessage = 200;

const initialState = {
    servers: [],
    watchedFiles: [],
    selecting: null,
    tempUrl: '',
    openNewServer: false,
    loading: false,
};

const setSocket = (state, { url, socket }) => {
    const replaceUrl = url => url.trim().toLowerCase().replace('\/', '');
    const serverIndex = state.servers.findIndex(server => replaceUrl(server.url) === replaceUrl(url));
    if (serverIndex < 0) return state;

    return {
        ...state,
        servers: changeMiddleValue(serverIndex)({ socket })(state.servers)
    };
};

const removeSocket = (state, { index, socket }) => {
    if (index < 0 && !socket) return state;

    if (index >= 0 && state.servers[index]) {
        return {
            ...state,
            servers: changeMiddleValue(index)({ socket: null })(state.servers)
        };
    }

    const serverIndex = state.servers.findIndex(server => server.socket === socket);
    if (serverIndex < 0) return state;

    const server = state.servers[serverIndex];
    if (server.socket) server.socket.disconnect();

    return {
        ...state,
        servers: changeMiddleValue(serverIndex)({ socket: null })(state.servers)
    };
};

const createWithSortFiles = (files, parent) =>
    (files && files.length) ? files.map(file => ({
        name: file.name,
        isDirectory: file.isDirectory,
        path: file.path,
        parent: parent,
        child: null
    })).sort(file => file.isDirectory ? -1 : 1) : [];


const setFiles = (state, { server, files, parent = null }) => {
    const serverIndex = state.servers.findIndex(stateServer => stateServer === server);
    if (serverIndex < 0) return state;
    return {
        ...state,
        servers: changeMiddleValue(serverIndex)({
            files: [
                ...state.servers[serverIndex].files,
                ...files.map(file => ({
                    name: file.name,
                    path: file.path,
                    parent,
                    type: file.isDirectory ? DIRECTORY : FILE,
                    extended: false
                }))
            ]
        })(state.servers)
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

const applyErrorFile = (state, { path: errorPath }) => {
    if (!state.socket || !errorPath) return state;

    const watchedFile = state.watchedFiles.find(({ path }) => path === errorPath);
    if (!watchedFile) return state;
    state.watchedFiles.splice(state.watchedFiles.indexOf(watchedFile), 1);
    return { ...state, watchedFiles: [...state.watchedFiles], errorFiles: [...state.errorFiles, watchedFile] };
};

const toggleExtend = (state, { server, file, extend = null }) => {
    const serverIndex = state.servers.findIndex(stateServer => stateServer === server);
    if (serverIndex < 0) return state;
    const fileIndex = state.servers[serverIndex].files.findIndex(stateFile => stateFile === file);
    if (fileIndex < 0) return state;

    const files = (extend !== null && extend || !file.extended) ? [] :
        changeMiddleValue(fileIndex)({
            extended: (extend !== null) ? extend : !state.servers[serverIndex].files[fileIndex].extended
        })(state.servers[serverIndex].files);

    return {
        ...state,
        servers: changeMiddleValue(serverIndex)({ files })(state.servers)
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