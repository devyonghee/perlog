import { types } from './actions';

const limitMessage = 200;

const initialState = {
    socket: null,
    searching: null,
    files: [],
    messages: [],
    watchedFiles: [],
    errorFiles: [],
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
    if (!!watch) {
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
        case types.SET_SOCKET:
            return { ...state, socket: action.socket };

        case types.RESET_SOCKET:
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

        case types.SEARCH:
            if (!state.socket) return state;
            state.socket.emit('search', (!!action.directory) ? action.directory.path : '');
            return { ...state, searching: action.directory };

        case types.SET_FILES:
            return applyFiles(state, action);

        case types.REQUEST_WATCH:
            return applyWatchingFile(state, action);

        case types.ADD_MESSAGE:
            return applyAddMessage(state, action);

        case types.SET_ERROR_FILE:
            return applyErrorFile(state, action);

        default:
            return state;
    }
}