import {
    ADD_SERVER,
    REMOVE_SOCKET,
    REQUEST_WATCH,
    SET_FILES,
    SET_SERVER_INFO,
    SET_SOCKET,
    TOGGLE_EXTEND
} from './actions';
import { changeValue, DIRECTORY, FILE } from '../utils';

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
    const server = state.servers.find(server => replaceUrl(server.url) === replaceUrl(url));
    if (!server) return state;

    return {
        ...state,
        servers: changeValue(server)({ socket })(state.servers)
    };
};

const removeSocket = (state, { socket }) => {
    const server = state.servers.find(server => server.socket === socket);
    if (!server) return state;

    if (server.socket) server.socket.disconnect();

    return {
        ...state,
        servers: changeValue(server)({ socket: null })(state.servers)
    };
};

const setFiles = (state, { server: targetServer, files, parentIndex = -1 }) => {
    const server = state.servers.find(server => server === targetServer);
    if (!server) return state;

    const newFiles = parentIndex < 0 ? [] : [...server.files];
    return {
        ...state,
        servers: changeValue(server)({
            files: newFiles.concat(...files.map(file => ({
                    name: file.name,
                    path: file.path,
                    parentIndex,
                    type: file.isDirectory ? DIRECTORY : FILE,
                    extended: false
                }))
            )
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

const toggleExtend = (state, { serverIndex, targetIndex, extend = null }) => {
    const server = state.servers[serverIndex];
    if(!server) return state;

    const file = state.servers[serverIndex].files[targetIndex];
    if(!file) return state;

    const newExtended = (extend !== null) ? extend : !file.extended;
    if (!newExtended) {
        const newFiles = server.files.filter(file => file.parent !== target);
        return {
            ...state,
            servers: changeValue(server)(
                {
                    files: changeValue(target)({
                        extended: newExtended
                    })(newFiles)
                }
            )(state.servers)
        };
    }

    return {
        ...state,
        servers: changeValue(server)(
            {
                files: changeValue(target)({ extended: newExtended })(server.files)
            }
        )(state.servers)
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