import { ADD_SERVER, REMOVE_SOCKET, SET_FILES, SET_SERVER_INFO, SET_SOCKET, SET_TOKEN, TOGGLE_EXTEND } from './actions';
import { changeChildValue, changeValue, DIRECTORY, FILE, findByIndex, replaceUrl } from '../utils';

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

const setToken = (state, { url, token }) => {
    const serverIndex = state.servers.findIndex(server => replaceUrl(server.url) === replaceUrl(url));
    if (serverIndex < 0) return state;
    return {
        ...state,
        servers: changeValue(serverIndex)({ token })(state.servers)
    };

};

const setSocket = (state, { url, socket }) => {
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
        files: findFile ? changeChildValue(index)({ child: newFiles, extended: true })(state.files) : newFiles
    };
};

const toggleExtend = (state, { index, extend }) => {
    return {
        ...state,
        files: changeChildValue(index)({ extended: extend })(state.files)
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
                        files: [],
                    }]
            };

        case SET_TOKEN:
            return setToken(state, action);

        case SET_SOCKET:
            return setSocket(state, action);

        case REMOVE_SOCKET:
            return removeSocket(state, action);

        case SET_FILES:
            return setFiles(state, action);

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