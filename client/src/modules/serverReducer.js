import {types} from "./serverAction";

const initialState = {socket: null, searching: null, files: [], messages: []};

const createWithSortFiles = (files, parent) => {
    return (files && files.length) ? files.map(file => ({
        name: file.name,
        isDirectory: file.isDirectory,
        path: file.path.replace(/(\\+|\/+)/g, '/'),
        parent: parent,
        child: []
    })).sort(file => file.isDirectory ? -1 : 1) : null;
};

const applyFiles = (state, {path, files: newFiles}) => {
    const paths = path.replace(/(\\+|\/+)/g, '/').split('/').filter(String);
    if (!paths.length) return state;

    const {files: stateFiles, searching: searchingDirectory} = state;

    if (!!searchingDirectory) {
        searchingDirectory.child = createWithSortFiles(newFiles, searchingDirectory);
        return {...state, searching: null, files: [...state.files]};
    }

    return {
        ...state,
        files: paths.reduce((currentFiles, path, currentIndex, paths) => {
            const currentPath = paths.slice(0, currentIndex + 1).join('/');
            const directory = {
                name: path,
                isDirectory: true,
                path: currentPath,
                parent: searchingDirectory,
                child: []
            };

            if (!currentFiles.length) currentFiles.push(directory);
            if (paths.length !== (currentIndex + 1)) return directory.child;

            if (!newFiles || !newFiles.length) directory.child = null;
            directory.child = createWithSortFiles(newFiles, directory);
            return [...stateFiles];
        }, stateFiles)
    }
};


export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SOCKET:
            return {...state, socket: action.socket};

        case types.RESET_SOCKET:
            if (!!state.socket) state.socket.disconnect();
            return {...state, socket: null};

        case types.SEARCH:
            if (!state.socket) return state;
            state.socket.emit('search', (!!action.directory) ? action.directory.path : '');
            return {...state, searching: action.directory};

        case types.SET_FILES:
            return applyFiles(state, action);

        case types.REQUEST_WATCH:
            if (!state.socket || !action.hasOwnProperty('file') || action.file.isDirectory) return state;
            (!!action.watch) ? state.socket.emit('watch', action.file.path) : state.socket.emit('forget', action.file.path);
            return state;

        case types.ADD_MESSAGE:
            if (!state.socket || !action.hasOwnProperty('file') || !action.hasOwnProperty('message')) return state;
            return {...state, messages:[...state.messages, {file:action.file, message:action.message}]};

        default:
            return state;
    }
}