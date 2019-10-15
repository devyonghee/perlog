import {
    ADD_MESSAGE,
    REQUEST_WATCH,
    RESET_SOCKET,
    SEARCH,
    SET_ERROR_FILE,
    SET_FILES,
    SET_OPEN_FORM,
    SET_SERVER_INFO,
    SET_SOCKET
} from './actions';

const limitMessage = 200;

const initialState = {
    socket: null,
    searching: null,
    files: [],
    messages: [],
    watchedFiles: [],
    errorFiles: [],
    url: '',
    name: '',
    token: '',
    openNewServer: false,
    loading: false,
};

const createWithSortFiles = (files, parent) =>
    (files && files.length) ? files.map(file => ({
        name: file.name,
        isDirectory: file.isDirectory,
        path: file.path,
        parent: parent,
        child: null
    })).sort(file => file.isDirectory ? -1 : 1) : [];

const applyFiles = (state, { path, files: newFiles }) => {
    const trimPath = path.replace(/(\\+|\/+)/g, '/').replace(/\/$/g, '');
    if (!trimPath) return state;

    const { searching: searchingDirectory } = state;

    if (!searchingDirectory) {
        const directory = {
            name: trimPath,
            isDirectory: true,
            path: trimPath,
            parent: searchingDirectory,
        };

        directory.child = createWithSortFiles(newFiles, directory);
        return { ...state, files: [directory] };
    }

    searchingDirectory.child = createWithSortFiles(newFiles, searchingDirectory);
    return { ...state, searching: null, files: [...state.files] };
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

const applyAddMessage = (state, action) => {
    if (!state.socket || !action.hasOwnProperty('message')) return state;
    const { path, message } = action;
    const watchedFile = state.watchedFiles.find(file => file.path === path);
    if (!watchedFile) return state;

    if (state.messages.length >= limitMessage) state.messages.shift();

    return { ...state, messages: [...state.messages, { file: watchedFile, message }] };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return { ...state, socket: action.socket };

        case SET_OPEN_FORM:
            return { ...state, openNewServer: action.open };

        case RESET_SOCKET:
            if (!!state.socket) state.socket.disconnect();
            return {
                name: '',
                socket: null,
                searching: null,
                files: [],
                watchedFiles: [],
                errorFiles: [],
                messages: state.messages
            };

        case SEARCH:
            if (!state.socket) return state;
            state.socket.emit('search', (!!action.directory) ? action.directory.path : '');
            return { ...state, searching: action.directory };

        case SET_FILES:
            return applyFiles(state, action);

        case REQUEST_WATCH:
            return applyWatchingFile(state, action);

        case ADD_MESSAGE:
            return applyAddMessage(state, action);

        case SET_ERROR_FILE:
            return applyErrorFile(state, action);

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